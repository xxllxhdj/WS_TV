
angular.module('ionicTV')

.controller('FocusManagerCtrl', ['$scope', '$element', function ($scope, $element) {
	var _self = this,
		_focusElement;

	_self.init = init;
	_self.setFocus = setFocus;

	function setFocus (element) {
		if (_focusElement) {
			_focusElement.removeClass('tvFocus');
		}
		element.addClass('tvFocus');
		_focusElement = element;
	}

	function init () {
		$scope.$on('$ionicView.afterEnter', function () {
		    angular.element(document).keydown(onkeydown);
		});
		$scope.$on('$ionicView.beforeLeave', function () {
		    angular.element(document).off('keydown', onkeydown);
		});
	}

	function onkeydown(event) {
        var keyCode = event.keyCode;
        if (keyCode === 37) { //左
        	onNavigation('left');
        } else if (keyCode === 38) { //上
        	onNavigation('up');
        } else if (keyCode === 39) { //右
        	onNavigation('right');
        } else if (keyCode === 40) { //下
        	onNavigation('down');
        } else if (keyCode === 13) { // 确认
        	onNavigation();
        }
    }

    function onNavigation (direction) {
    	if (!_focusElement) {
    		setDefaultFocus();
    		return;
    	}
    	if (!direction) {
    		_focusElement.trigger('click');
    		return;
    	}
    	var nextIndex = _focusElement.attr('next-focus-' + direction);
    	if (!nextIndex) {
    		return;
    	}
    	var elements = $element.find('*[focus-index="' + nextIndex + '"]');
    	if (elements.length === 0) {
    		return;
    	}
    	_self.setFocus(angular.element(elements[0]));
    }

    function setDefaultFocus () {
    	var elements = $element.find('*[focus-index]');
    	if (elements.length === 0) {
    		return;
    	}
    	_self.setFocus(angular.element(elements[0]));
    }
}]);