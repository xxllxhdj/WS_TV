
angular.module('ionicTV')

.factory('TvFocusManager', function () {
	var _activeFocus;
	return {
		setActive: setActiveFocus,
		getActive: getActiveFocus,
		suspendActive: suspendActiveFocus,
		resumeActive: resumeActiveFocus
	};

	function setActiveFocus (manager) {
		
		_activeFocus = manager;
	}
	function getActiveFocus () {
		return _activeFocus;
	}
	function suspendActiveFocus () {
		if (_activeFocus) {
			_activeFocus.suspend();
		}
	}
	function resumeActiveFocus () {
		if (_activeFocus) {
			_activeFocus.resume();
		}
	}
});