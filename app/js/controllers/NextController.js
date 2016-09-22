
angular.module('WorkStationTV.controllers')

.controller('NextController', ['$scope', '$ionicHistory', '$ionicModal', 
	function ($scope, $ionicHistory, $ionicModal) {

		$ionicModal.fromTemplateUrl('tpls/modal.html', {
		    scope: $scope,
		    animation: 'slide-in-right'
		}).then(function(modal) {
		    $scope.modal = modal;
		});

		$scope.$on('$destroy', function () {
		    $scope.modal.remove();
		});

		$scope.goBack = function () {
			$ionicHistory.goBack();
		};

		$scope.showModal = function () {
			$scope.modal.show();
		};
	}
]);