
angular.module('ionicTV')

.controller('FocusManagerCtrl', ['$scope', '$element', function ($scope, $element) {
	var _self = this,
		_focusElement, _holdTimer, _cancelEvent;

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
		    angular.element(document).keyup(onkeyup);
		});
		$scope.$on('$ionicView.beforeLeave', function () {
            angular.element(document).off('keydown', onkeydown);
		    angular.element(document).off('keyup', onkeyup);
		});
	}

    function onkeydown(event) {
        if (_cancelEvent) {
            return;
        }
        if (!_focusElement) {
            setDefaultFocus();
            _cancelEvent = true;
            return;
        }
        if (_holdTimer) {
            return;
        }

        _holdTimer = setTimeout(function() {
            _cancelEvent = true;
            _holdTimer = null;
            onHold(event);
        }, 500);
    }

    function onkeyup(event) {
        if (_holdTimer) {
            clearTimeout(_holdTimer);
            _holdTimer = null;
        }
        if (_cancelEvent) {
            _cancelEvent = false;
            return;
        }
        onClick(event);
    }

    function onHold (event) {
        if (!_focusElement) {
            setDefaultFocus();
            return;
        }
        var direction = findDirection(event.keyCode);
        if (!direction) {
            return;
        }
        if (direction === 'ok') {
            var evt = document.createEvent('Event');
            evt.initEvent('hold', true, true);
            _focusElement.get(0).dispatchEvent(evt);
            return;
        }
        $scope.$broadcast('focusManager.hold' + direction);
    }

    function onClick (event) {
    	if (!_focusElement) {
    		setDefaultFocus();
    		return;
    	}
        var direction = findDirection(event.keyCode);
    	if (!direction) {
    		return;
    	}
        if (direction === 'ok') {
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

    function findDirection (keyCode) {
        var direction = null;
        if (keyCode === 37) { //左
            direction = 'left';
        } else if (keyCode === 38) { //上
            direction = 'up';
        } else if (keyCode === 39) { //右
            direction = 'right';
        } else if (keyCode === 40) { //下
            direction = 'down';
        } else if (keyCode === 13) { // 确认
            direction = 'ok';
        }
        return direction;
    }
}]);