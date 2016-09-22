
angular.module('ionicTV')

.directive('focusManager', function () {
	return {
		restrict: 'A',
		require: ['focusManager'],
		controller: 'FocusManagerCtrl'
	};
});