
angular.module('ionicTV')

.factory('TvDialog', ['TvList', 'TvToast', 'TvPopup', 
	function (TvList, TvToast, TvPopup) {
		return {
			showList: function (opts) {
				return TvList.show(opts);
			},
			toast: function (opts) {
                return TvToast.show(opts);
            },
            toastTop: function (msg) {
                return TvToast.show({
                    message: msg,
                    position: 'top',
                    duration: 'short'
                });
            },
            toastCenter: function (msg) {
                return TvToast.show({
                    message: msg,
                    position: 'center',
                    duration: 'short'
                });
            },
            toastBottom: function (msg) {
                return TvToast.show({
                    message: msg,
                    position: 'bottom',
                    duration: 'short'
                });
            },
            alert: function(message, title) {
                return TvPopup.alert({
                    cssClass: 'tv-popup',
                    title: title || '提示框',
                    okText: '确定',
                    okType: 'im-button-ok',
                    template: message
                });
            },
            confirm: function(message, title) {
                return TvPopup.confirm({
                    cssClass: 'tv-popup',
                    title: title || '消息框',
                    template: message,
                    buttons: [{
                        text: '取消',
                        onTap: function() {
                            return false;
                        }
                    }, {
                        text: '确定',
                        type: 'im-button-ok',
                        onTap: function() {
                            return true;
                        }
                    }]
                });
            },
            prompt: function (defaultText, title) {
                return showPrompt({
                    cssClass: 'tv-popup',
                    title: title || '输入框',
                    defaultText: defaultText,
                    cancelText: '取消',
                    okText: '确认',
                    okType: 'im-button-ok'
                });
            }
		};

        function showPrompt(opts) {
            var scope = $rootScope.$new(true);
            scope.data = {};
            scope.data.response = opts.defaultText ? opts.defaultText : '';

            return TvPopup.show(angular.extend({
                template: '<textarea ng-model="data.response">',
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