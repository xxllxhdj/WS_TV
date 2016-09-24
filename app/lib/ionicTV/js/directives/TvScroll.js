
angular.module('ionicTV')

.directive('tvScroll', function () {
	return {
		restrict: 'A',
		require: ['?^$ionicScroll'],
		link: function($scope, $element, $attrs, ctrls) {
			var _scrollCtrl = ctrls[0];

			$scope.$on('tvFocus.beforechange', function (e, tvFocus) {
				tcFocusChange(tvFocus);
			});

			function tcFocusChange (tvFocus) {
				var nextEl = tvFocus.nextElement;
				if (!nextEl) {
					return;
				}

				var scrollPos = _scrollCtrl.getScrollPosition(),
					elPos = nextEl.position(),
					scrollingX = _scrollCtrl._scrollViewOptions.scrollingX,
					scrollingY = _scrollCtrl._scrollViewOptions.scrollingY,
					scrollByX = 0, 
					scrollByY = 0;

				if (scrollingX) {
					var scrollWidth = $element.width(),
						elWidth = nextEl.width();
					if (elPos.left < 0) {
						scrollByX = elPos.left;
					} else if (elPos.left + elWidth > scrollWidth) {
						scrollByX = elPos.left + elWidth - scrollWidth;
					}
				}
				if (scrollingY) {
					var scrollHeight = $element.height(),
						elHeight = nextEl.height();
					if (elPos.top < 0) {
						scrollByY = elPos.top;
					} else if (elPos.top + elHeight > scrollHeight) {
						scrollByY = elPos.top + elHeight - scrollHeight;
					}
				}

				if (scrollByX || scrollByY) {
					_scrollCtrl.scrollBy(scrollByX, scrollByY, true);
				}
			}
		}
	};
});