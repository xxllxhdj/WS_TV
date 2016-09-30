
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
						elWidth = nextEl.width(),
						elReLeft = elPos.left - scrollPos.left;

					var marginLeft = parseInt($element.css('marginLeft').replace(/px/g, ''), 0),
						marginRight = parseInt($element.css('marginRight').replace(/px/g, ''), 0);
					if (marginLeft < 0) {
						scrollHeight -= marginLeft;
					}
					if (marginRight < 0) {
						scrollHeight -= marginRight;
					}

					if (elReLeft < 0) {
						scrollByX = elReLeft;
					} else if (elPos.left + elWidth > scrollWidth) {
						scrollByX = elPos.left + elWidth - scrollWidth;
					}
				}
				if (scrollingY) {
					var scrollHeight = $element.innerHeight(),
						elHeight = nextEl.innerHeight(),
						elReTop = elPos.top - scrollPos.top;

					var marginTop = parseInt($element.css('marginTop').replace(/px/g, ''), 0),
						marginBottom = parseInt($element.css('marginBottom').replace(/px/g, ''), 0);
					if (marginTop < 0) {
						scrollHeight -= marginTop;
					}
					if (marginBottom < 0) {
						scrollHeight -= marginBottom;
					}

					if (elReTop < 0) {
						scrollByY = elReTop;
					} else if (elReTop + elHeight > scrollHeight) {
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