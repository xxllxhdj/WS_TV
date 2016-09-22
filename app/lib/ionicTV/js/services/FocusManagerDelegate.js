
angular.module('ionicTV')

.service('FocusManagerDelegate', function () {
	var _activeFocusManager;
	return {
		setActive: setActiveFocusManager,
		getActive: getActiveFocusManager,
		suspendActive: suspendActiveFocusManager,
		resumeActive: resumeActiveFocusManager
	};

	function setActiveFocusManager (manager) {
		
		_activeFocusManager = manager;
	}
	function getActiveFocusManager () {
		return _activeFocusManager;
	}
	function suspendActiveFocusManager () {
		if (_activeFocusManager) {
			_activeFocusManager.suspend();
		}
	}
	function resumeActiveFocusManager () {
		if (_activeFocusManager) {
			_activeFocusManager.resume();
		}
	}
});