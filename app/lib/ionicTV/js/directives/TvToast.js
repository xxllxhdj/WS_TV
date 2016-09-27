
angular.module('ionicTV')

.directive('ionToast', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: 
        '<div class="toast-backdrop">' +
            '<div class="toast-wrapper" ng-transclude></div>' +
        '</div>'
    };
});