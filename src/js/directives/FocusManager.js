
angular.module('ionicTV')

.directive('focusManager', function () {
	return {
		restrict: 'A',
		require: ['focusManager'],
		controller: 'FocusManagerCtrl',
		link: function($scope, $element, $attrs, ctrls) {
			var focusManagerCtrl = ctrls[0];
			focusManagerCtrl.init();
		}
	};
});