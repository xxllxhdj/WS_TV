
angular.module('ionicTV')

.directive('focusInit', function () {
	return {
		restrict: 'A',
		require: ['?^focusManager'],
		link: function($scope, $element, $attrs, ctrls) {
			var focusManagerCtrl = ctrls[0];
			focusManagerCtrl.setFocus($element);
		}
	};
});