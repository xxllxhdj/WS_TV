angular.module('WorkStationTV.services')

.factory('InitService', ['$q', '$ionicPlatform', '$ionicHistory', '$timeout', '$cordovaToast', 'APPCONSTANTS',
    function($q, $ionicPlatform, $ionicHistory, $timeout, $cordovaToast, APPCONSTANTS) {
        var defer = $q.defer();

        init();

        return defer.promise;

        function init() {
            $ionicPlatform.registerBackButtonAction(
                onHardwareBackButton,
                APPCONSTANTS.platformBackButtonPriorityView
            );

            var tasks = [];
            $q.all(tasks).finally(function() {
                defer.resolve();
            });
        }

        var _confirmExit = false;
        function onHardwareBackButton(e) {
            if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            } else {
                if (_confirmExit) {
                    ionic.Platform.exitApp();
                } else {
                    _confirmExit = true;
                    $cordovaToast.showShortBottom('再按一次退出');
                    $timeout(function () {
                        _confirmExit = false;
                    }, APPCONSTANTS.exitAppConfirmTime);
                }
            }

            e.preventDefault();
            return false;
        }
    }
]);
