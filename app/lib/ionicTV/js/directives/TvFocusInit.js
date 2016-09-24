
angular.module('ionicTV')

.directive('tvFocusInit', function () {
	return {
		restrict: 'A',
		require: ['?^tvFocus'],
		link: function($scope, $element, $attrs, ctrls) {
			var tvFocusCtrl = ctrls[0];
			tvFocusCtrl.setFocus($element);
		}
	};
});