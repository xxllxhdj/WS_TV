
angular.module('WorkStationTV.controllers')

.controller('NextController', ['$scope', '$ionicHistory', function ($scope, $ionicHistory) {
	$scope.goBack = function () {
		$ionicHistory.goBack();
	};
}]);