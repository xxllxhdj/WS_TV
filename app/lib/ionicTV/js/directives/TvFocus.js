
angular.module('ionicTV')

.directive('tvFocus', function () {
	return {
		restrict: 'A',
		controller: 'TvFocusController'
	};
});