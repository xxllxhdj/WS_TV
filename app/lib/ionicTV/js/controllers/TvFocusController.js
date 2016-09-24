
angular.module('ionicTV')

.controller('TvFocusController', ['$scope', '$element', '$attrs', 'TvFocusManager', 
	function ($scope, $element, $attrs, TvFocusManager) {
		var _self = this,
	        _enbled = false,
			_focusElement, _holdTimer, _cancelEvent;

	    _self.setFocus = setFocus;
	    _self.suspend = suspend;
		_self.resume = resume;

	    init();

	    function init () {
	        var resumeEvent = '$ionicView.afterEnter',
	            suspendEvent = '$ionicView.beforeLeave',
	            destroyEvent = '$destroy';

	        if ($attrs.focusManager) {
	            resumeEvent = $attrs.focusManager + '.shown';
	            suspendEvent = $attrs.focusManager + '.hidden';
	            destroyEvent = $attrs.focusManager + '.removed';
	        }

	        $scope.$on(resumeEvent, function () {
	            resume();
	        });
	        $scope.$on(suspendEvent, function () {
	            suspend();
	        });
	        $scope.$on(destroyEvent, function () {
	            suspend();
	        });
	    }

	    function suspend () {
	        if (!_enbled) {
	            return;
	        }

	        angular.element(document).off('keydown', onkeydown);
	        angular.element(document).off('keyup', onkeyup);

	        if ($attrs.focusManager) {
	            TvFocusManager.resumeActive();
	        }

	        _enbled = false;
	    }

	    function resume () {
	        if (_enbled) {
	            return;
	        }

	        angular.element(document).keydown(onkeydown);
	        angular.element(document).keyup(onkeyup);

	        if (!$attrs.focusManager) {
	            TvFocusManager.setActive(_self);
	        } else {
	            TvFocusManager.suspendActive();
	        }

	        _enbled = true;
	    }

		function setFocus (element) {
			if (_focusElement) {
				_focusElement.removeClass('tvFocus');
			}
			element.addClass('tvFocus');
			_focusElement = element;
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
	}
]);