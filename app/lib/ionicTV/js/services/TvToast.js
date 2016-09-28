
angular.module('ionicTV')

.factory('TvToast', ['$q', '$rootScope', '$ionicModal', '$timeout', 
	function ($q, $rootScope, $ionicModal, $timeout) {
		return {
			show: showToast
		};

		function showToast (opts) {
		    opts.animation = opts.animation ? opts.animation : 'tv-toast-fade-in';
            opts.duration = opts.duration !== undefined ? opts.duration : 'short';
            if (opts.duration === 'short') {
                opts.duration = 2000;
            } else if (opts.duration === 'long') {
                opts.duration = 4000;
            }

            var scope = $rootScope.$new(true);
            scope.data = {};
            scope.data.message = opts.message ? opts.message : '';

            var templateString = '<div class="tv-toast-view toast">{{data.message}}</div>';

            opts = angular.extend({
                viewType: 'toast',
                scope: scope
            }, opts || {});

            var modal = $ionicModal.fromTemplate(templateString, opts);

            if (opts.duration && angular.isNumber(opts.duration)) {
                $timeout(function () {
                    modal.hide();
                }, opts.duration);
            }

            var position = opts.position ? opts.position : 'bottom',
                block = !!opts.block,
                toastView = modal.$el.find('.tv-toast-view');
            toastView.addClass('toast-' + position);
            if (block) {
                toastView.addClass('toast-block');
            }

            scope.$on('toast.hidden', function () {
                $timeout(function() {
                    modal.scope.$destroy();
                    modal.$el.remove();
                }, modal.hideDelay || 320);
            });

            modal.show();

            return modal;
		}
	}
]);