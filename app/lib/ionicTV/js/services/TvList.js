
angular.module('ionicTV')

.service('TvList', ['$q', '$rootScope', '$ionicModal', '$timeout', 
	function ($q, $rootScope, $ionicModal, $timeout) {
		return {
			show: showList
		};

		function showList (opts) {
		    var defer = $q.defer();

		    var scope = $rootScope.$new(true),
		        list = opts.list ? opts.list : [];
		    scope.data = {};
		    scope.data.title = opts.title ? opts.title : '';
		    scope.data.list = list;
		    scope.data.valueField = opts.valueField ? opts.valueField : 'id';
		    scope.data.displayField = opts.displayField ? opts.displayField : 'name';
		    scope.data.value = opts.value ? opts.value : '';

		    var templateString = 
		    '<ion-modal-view class="tv-list-view" tv-focus="modal">' +
		        '<div class="title">{{data.title}}</div>' +
		        '<ion-scroll tv-scroll>' +
		            '<ion-radio class="tv-list-radio" icon="ion-android-done" ng-model="data.value" ng-repeat="item in data.list" ' +
		                'ng-value="\'{{item[data.valueField]}}\'" ng-click="onClick(item)" ' + 
		                'focus-index="{{$index}}" next-focus-up="{{$index -1}}" next-focus-down="{{$index + 1}}"' + 
		                '>{{item[data.displayField]}}</ion-radio>' +
		        '</ion-scroll>' +
		    '</ion-modal-view>';

		    var modal = $ionicModal.fromTemplate(templateString, {
		        scope: scope,
		        animation: 'tv-slide-fade-in'
		    });
		    scope.onClick = function (item) {
		        modal.hide();
		        defer.resolve(item);
		    };
		    scope.$on('modal.hidden', function () {
		        $timeout(function() {
		            modal.scope.$destroy();
		            modal.$el.remove();
		        }, modal.hideDelay || 320);
		    });

		    modal.show();

		    return defer.promise;
		}
	}
]);