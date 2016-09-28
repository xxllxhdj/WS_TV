angular.module('ionicTV')

.factory('TvPopup', [
    '$ionicTemplateLoader',
    '$ionicBackdrop',
    '$q',
    '$timeout',
    '$rootScope',
    '$ionicBody',
    '$compile',
    '$ionicPlatform',
    '$ionicModal',
    'IONIC_BACK_PRIORITY',
    function($ionicTemplateLoader, $ionicBackdrop, $q, $timeout, $rootScope, $ionicBody, $compile, $ionicPlatform, $ionicModal, IONIC_BACK_PRIORITY) {
        //TODO allow this to be configured
        var config = {
            stackPushDelay: 75
        };
        var popupStack = [];

        var $ionicPopup = {
            show: showPopup,
            alert: showAlert,
            confirm: showConfirm,
            prompt: showPrompt,
            /**
             * @private for testing
             */
            _createPopup: createPopup,
            _popupStack: popupStack
        };

        return $ionicPopup;

        function createPopup(options) {
            options = angular.extend({
                scope: null,
                title: '',
                buttons: []
            }, options || {});

            var POPUP_TPL =
            '<div class="popup-container" ng-class="cssClass" tv-focus="popup">' +
                '<div class="popup">' +
                    '<div class="popup-head">' +
                        '<h3 class="popup-title" ng-bind-html="title"></h3>' +
                        '<h5 class="popup-sub-title" ng-bind-html="subTitle" ng-if="subTitle"></h5>' +
                    '</div>' +
                    '<div class="popup-body">' +
                    '</div>' +
                    '<div class="popup-buttons" ng-show="buttons.length">' +
                        '<div ng-repeat="button in buttons" ng-click="$buttonTapped(button, $event)" class="button" ng-class="button.type || \'button-default\'" ng-bind-html="button.text"' +
                            'focus-index="{{$index}}" next-focus-left="{{$index -1}}" next-focus-right="{{$index + 1}}">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

            var self = {};
            self.scope = (options.scope || $rootScope).$new();
            self.element = angular.element(POPUP_TPL);
            self.responseDeferred = $q.defer();

            $ionicBody.get().appendChild(self.element[0]);
            $compile(self.element)(self.scope);

            angular.extend(self.scope, {
                title: options.title,
                buttons: options.buttons,
                subTitle: options.subTitle,
                cssClass: options.cssClass,
                $buttonTapped: function(button, event) {
                    var result = (button.onTap || noop).apply(self, [event]);
                    event = event.originalEvent || event; //jquery events

                    if (!event.defaultPrevented) {
                        self.responseDeferred.resolve(result);
                    }
                }
            });

            $q.when(
                options.templateUrl ?
                $ionicTemplateLoader.load(options.templateUrl) :
                (options.template || options.content || '')
            ).then(function(template) {
                var popupBody = angular.element(self.element[0].querySelector('.popup-body'));
                if (template) {
                    popupBody.html(template);
                    $compile(popupBody.contents())(self.scope);
                } else {
                    popupBody.remove();
                }
            });

            self.show = function() {
                if (self.isShown || self.removed) return;

                $ionicModal.stack.add(self);
                self.isShown = true;
                ionic.requestAnimationFrame(function() {
                    //if hidden while waiting for raf, don't show
                    if (!self.isShown) return;

                    self.element.removeClass('popup-hidden');
                    self.element.addClass('popup-showing active');
                    focusInput(self.element);
                    self.scope.$parent && self.scope.$parent.$broadcast('popup.shown', self);
                });
            };

            self.hide = function(callback) {
                callback = callback || noop;
                if (!self.isShown) return callback();

                $ionicModal.stack.remove(self);
                self.isShown = false;
                self.element.removeClass('active');
                self.element.addClass('popup-hidden');
                $timeout(function () {
                    self.scope.$parent && self.scope.$parent.$broadcast('popup.hidden', self);
                    callback();
                }, 250, false);
            };

            self.remove = function() {
                if (self.removed) return;

                self.hide(function() {
                    self.element.remove();
                    self.scope.$destroy();
                });

                self.removed = true;

                self.scope.$parent && self.scope.$parent.$broadcast('popup.removed', self);
            };

            return self;
        }

        function onHardwareBackButton() {
            var last = popupStack[popupStack.length - 1];
            last && last.responseDeferred.resolve();
        }

        function showPopup(options) {
            var popup = $ionicPopup._createPopup(options);
            var showDelay = 0;

            if (popupStack.length > 0) {
                showDelay = config.stackPushDelay;
                $timeout(popupStack[popupStack.length - 1].hide, showDelay, false);
            } else {
                //Add popup-open & backdrop if this is first popup
                $ionicBody.addClass('popup-open');
                $ionicBackdrop.retain();
                //only show the backdrop on the first popup
                $ionicPopup._backButtonActionDone = $ionicPlatform.registerBackButtonAction(
                    onHardwareBackButton,
                    IONIC_BACK_PRIORITY.popup
                );
            }

            // Expose a 'close' method on the returned promise
            popup.responseDeferred.promise.close = function popupClose(result) {
                if (!popup.removed) popup.responseDeferred.resolve(result);
            };
            //DEPRECATED: notify the promise with an object with a close method
            popup.responseDeferred.notify({ close: popup.responseDeferred.close });

            doShow();

            return popup.responseDeferred.promise;

            function doShow() {
                popupStack.push(popup);
                $timeout(popup.show, showDelay, false);

                popup.responseDeferred.promise.then(function(result) {
                    var index = popupStack.indexOf(popup);
                    if (index !== -1) {
                        popupStack.splice(index, 1);
                    }

                    popup.remove();

                    if (popupStack.length > 0) {
                        popupStack[popupStack.length - 1].show();
                    } else {
                        $ionicBackdrop.release();
                        //Remove popup-open & backdrop if this is last popup
                        $timeout(function() {
                            // wait to remove this due to a 300ms delay native
                            // click which would trigging whatever was underneath this
                            if (!popupStack.length) {
                                $ionicBody.removeClass('popup-open');
                            }
                        }, 400, false);
                        ($ionicPopup._backButtonActionDone || noop)();
                    }


                    return result;
                });

            }

        }

        function focusInput(element) {
            var focusOn = element[0].querySelector('[autofocus]');
            if (focusOn) {
                focusOn.focus();
            }
        }

        function showAlert(opts) {
            return showPopup(angular.extend({
                buttons: [{
                    text: opts.okText || 'OK',
                    type: opts.okType || 'button-positive',
                    onTap: function() {
                        return true;
                    }
                }]
            }, opts || {}));
        }

        function showConfirm(opts) {
            return showPopup(angular.extend({
                buttons: [{
                    text: opts.cancelText || 'Cancel',
                    type: opts.cancelType || 'button-default',
                    onTap: function() {
                        return false; }
                }, {
                    text: opts.okText || 'OK',
                    type: opts.okType || 'button-positive',
                    onTap: function() {
                        return true; }
                }]
            }, opts || {}));
        }

        function showPrompt(opts) {
            var scope = $rootScope.$new(true);
            scope.data = {};
            scope.data.fieldtype = opts.inputType ? opts.inputType : 'text';
            scope.data.response = opts.defaultText ? opts.defaultText : '';
            scope.data.placeholder = opts.inputPlaceholder ? opts.inputPlaceholder : '';
            scope.data.maxlength = opts.maxLength ? parseInt(opts.maxLength) : '';
            var text = '';
            if (opts.template && /<[a-z][\s\S]*>/i.test(opts.template) === false) {
                text = '<span>' + opts.template + '</span>';
                delete opts.template;
            }
            return showPopup(angular.extend({
                template: text + '<input ng-model="data.response" ' + 'type="{{ data.fieldtype }}"' + 'maxlength="{{ data.maxlength }}"' + 'placeholder="{{ data.placeholder }}"' + '>',
                scope: scope,
                buttons: [{
                    text: opts.cancelText || 'Cancel',
                    type: opts.cancelType || 'button-default',
                    onTap: function() {}
                }, {
                    text: opts.okText || 'OK',
                    type: opts.okType || 'button-positive',
                    onTap: function() {
                        return scope.data.response || '';
                    }
                }]
            }, opts || {}));
        }
    }
]);
