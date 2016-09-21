
angular.module('WorkStationTV.controllers')

.controller('HomeController', ['$scope', '$state', '$cordovaToast', function ($scope, $state, $cordovaToast) {
	$scope.headerBtnLeft = function () {
		if (window.cordova) {
			$cordovaToast.showShortBottom('左侧按钮');
		} else {
			console.log('左侧按钮');
		}
	};

	$scope.goNext = function () {
		$state.go('next');
	};

	$scope.onHold = function () {
		if (window.cordova) {
			$cordovaToast.showShortBottom('onHold');
		} else {
			console.log('onHold');
		}
	};
}]);