
angular.module('ionicTV')

.service('TvDialog', ['TvList', 'TvToast',
	function (TvList, TvToast) {
		return {
			showList: function (opts) {
				return TvList.show(opts);
			},
			toast: function (opts) {
                return TvToast.show(opts);
            },
            toastTop: function (msg) {
                return TvToast.show({
                    message: msg,
                    position: 'top',
                    duration: 'short'
                });
            },
            toastCenter: function (msg) {
                return TvToast.show({
                    message: msg,
                    position: 'center',
                    duration: 'short'
                });
            },
            toastBottom: function (msg) {
                return TvToast.show({
                    message: msg,
                    position: 'bottom',
                    duration: 'short'
                });
            }
		};
	}
]);