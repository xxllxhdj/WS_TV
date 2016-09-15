
angular.module('WorkStationTV.controllers')

.controller('HomeController', ['$scope', function ($scope) {
	$scope.headerBtnLeft = function () {
		alert('左侧按钮');
	};
}]);