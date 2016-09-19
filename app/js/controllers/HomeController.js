
angular.module('WorkStationTV.controllers')

.controller('HomeController', ['$scope', '$state', function ($scope, $state) {
	$scope.headerBtnLeft = function () {
		alert('左侧按钮');
	};

	$scope.goNext = function () {
		$state.go('next');
	};
}]);