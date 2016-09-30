
angular.module('WorkStationTV', [
    'ionic',
    'ngCordova',
    'ionicTV',

    'WorkStationTV.controllers',
    'WorkStationTV.directives',
    'WorkStationTV.services',
    'WorkStationTV.utility'
])

    .run(['$ionicPlatform', '$timeout', 'InitService', 'APPCONSTANTS',
        function ($ionicPlatform, $timeout, InitService, APPCONSTANTS) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                if (navigator.splashscreen) {
                    InitService.then(function () {
                        $timeout(function () {
                            navigator.splashscreen.hide();
                        }, APPCONSTANTS.splashScreenExtraDelay);
                    });
                }
            });
        }
    ])

    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
        function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'tpls/home.html',
                    controller: 'HomeController'
                })
                .state('next', {
                    url: '/next',
                    templateUrl: 'tpls/next.html',
                    controller: 'NextController'
                })
                .state('last', {
                    url: '/last',
                    templateUrl: 'tpls/last.html',
                    controller: 'LastController'
                });
                
            $urlRouterProvider.otherwise('/home');

            $ionicConfigProvider.platform.android.scrolling.jsScrolling(true);
            $ionicConfigProvider.platform.android.navBar.alignTitle('center');
            $ionicConfigProvider.platform.android.backButton.previousTitleText(false);
            $ionicConfigProvider.platform.android.navBar.transition('view');
            $ionicConfigProvider.platform.android.views.transition('ios');
            $ionicConfigProvider.platform.android.views.swipeBackEnabled(true);
            $ionicConfigProvider.platform.android.views.swipeBackHitWidth(45);
            $ionicConfigProvider.platform.android.tabs.style('standard');
            $ionicConfigProvider.platform.android.tabs.position('bottom');
            $ionicConfigProvider.platform.android.form.toggle('large');

            $ionicConfigProvider.platform.default.backButton.previousTitleText(false);
            $ionicConfigProvider.platform.default.backButton.text(false);
        }
    ]);

(function () {
    document.addEventListener("deviceready", onReady, false);

    if (typeof cordova === 'undefined') {
        angular.element(document).ready(onReady);
    }

    function onReady () {
        angular.bootstrap(document, ['WorkStationTV']);
    }
})();