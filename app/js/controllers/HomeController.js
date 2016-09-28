
angular.module('WorkStationTV.controllers')

.controller('HomeController', ['$scope', '$state', '$cordovaToast', 'TvDialog',
	function ($scope, $state, $cordovaToast, TvDialog) {
		$scope.headerBtnLeft = function () {
			TvDialog.toastBottom('左侧按钮');
		};

		$scope.goNext = function () {
			$state.go('next');
		};

		$scope.onHold = function () {
			TvDialog.toastCenter('onHold');
		};

		$scope.showConfirm = function () {
			TvDialog.confirm('测试测试').then(function (res) {
				if (res) {
					TvDialog.toastBottom('确认');
				} else {
					TvDialog.toastBottom('取消');
				}
			});
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
			        { id: 9, name: '测试9' }
			    ],
			    valueField: 'id',
			    displayField: 'name',
			    value: 8
			}).then(function (select) {
			    TvDialog.toastTop(angular.toJson(select));
			});
		};
	}
]);