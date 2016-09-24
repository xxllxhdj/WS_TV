
angular.module('WorkStationTV.controllers')

.controller('HomeController', ['$scope', '$state', '$cordovaToast', 'TvDialog',
	function ($scope, $state, $cordovaToast, TvDialog) {
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

		$scope.showList = function () {
			TvDialog.showList({
			    title: '列表',
			    list: [
			        { id: 1, name: '测试1' },
			        { id: 2, name: '测试2' },
			        { id: 3, name: '测试3' },
			        { id: 4, name: '测试4' },
			        { id: 5, name: '测试5' },
			        { id: 6, name: '测试6' },
			        { id: 7, name: '测试7' },
			        { id: 8, name: '测试8' },
			        { id: 9, name: '测试9' },
			        { id: 10, name: '测试10'}
			    ],
			    valueField: 'id',
			    displayField: 'name',
			    value: 8
			}).then(function (select) {
			    if (window.cordova) {
			    	$cordovaToast.showShortBottom(angular.toJson(select));
			    } else {
			    	console.log(angular.toJson(select));
			    }
			});
		};
	}
]);