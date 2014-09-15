/*
 * Timer Factory can be used to via timerFactory.create(tickIntervalMinutes, events, timoutMinutes, callback) function 
 * to create an instance of the timer object with getters and setters.
 */

var TimerFactory = {
    create: function(tickIntervalMinutes, events, timoutMinutes, callback) {
        /* Valid input is numeric value for "tickIntervalMinutes" & "timoutMinutes" parameters,
         * String value for "events" parameter and Function value for "callback" parameter.
         * If any of the parameter is not provided or has invalid value, factory would log an error on console and return null
         */

        if ((typeof tickIntervalMinutes !== "number") ? true : false
            || (typeof events !== "string") ? true : false
            || (typeof timoutMinutes !== "number") ? true : false
            || (typeof callback !== "function") ? true : false) {
            console.log("TimeFactory.create(...) parameters are not provided correctly. "
                + "Please follow timerFactory.create(tickIntervalMinutes, events, timoutMinutes, callback) convension.\n\n"
                + "Valid input is numeric value for \"tickIntervalMinutes\" & \"timoutMinutes\" parameters, "
                + "String value for \"events\" parameter and Function value for \"callback\" paramter.");
            return null;
        }

        // Timer variables and functions
        var _elapsedTime = 0, _eventList = events, _timeoutEventArray,
            _timeoutMinutes = timoutMinutes, _timeoutFunction = callback, _tickInterval,
        // Internal variables in factory
            _tickIntervalMilliseconds = Math.round(60000 * tickIntervalMinutes),
            _start, _tick, _stop, _reset;

        _start = function() {
            try {
                _stop();
                _tickInterval = setInterval(_tick, _tickIntervalMilliseconds);
                _timeoutEventArray = _eventList.split(" ");
                _timeoutEventArray.forEach(function(el) {
                    window.addEventListener(el, _reset);
                });
            } catch (ex) {
                // Only log the exception on console if browser supports console. (older IE doesn't support console)
                if (!!window.console)
                    console.error(ex);
                throw ex;
            }
        };

        _tick = function() {
            _elapsedTime += _tickIntervalMilliseconds;
            if (document && document.debug === true) {
                window.console&&console.log("Timer Tick: elapsed time in milliseconds = " + _elapsedTime
                    + " (~" + (_elapsedTime / 60000).toFixed(2) + " minutes)"
                    + " -- timeout in milliseconds = " + _timeoutMinutes * 60000
                    + " (~"  + _timeoutMinutes.toFixed(2) + " minutes)");
            }
            if (_elapsedTime / 60000 >= _timeoutMinutes) {
                _stop();
                _timeoutFunction();
            }
        };

        _stop = function() {
            try {
                _timeoutEventArray = _eventList.split(" ");
                _timeoutEventArray.forEach(function(el) {
                    window.removeEventListener(el, _reset);
                });
                window.clearInterval(_tickInterval);
            } catch (ex) {
                // Only log the exception on console if browser supports console. (older IE doesn't support console)
                if (!!window.console)
                    console.error(ex);
                throw ex;
            }
        };

        _reset = function() {
            _elapsedTime = 0;
        };

        // Closure below uses private variables and functions above to create a fresh time object and return it.
        return {
            getTickIntervalMilliseconds: function() { return _tickIntervalMilliseconds },
            setTickIntervalMilliseconds: function(newTickInterval) { _tickIntervalMilliseconds = newTickInterval },
            getTimeoutEventList: function() { return _eventList },
            setTimeoutEventList: function(newList) { _eventList = newList },
            getTimeoutMinutes: function() { return _timeoutMinutes },
            setTimeoutMinutes: function(newMinutes) { _timeoutMinutes = newMinutes },
            getTimeoutFunction: function() { return _timeoutFunction },
            setTimeoutFunction: function(newCallBack) { _timeoutFunction = newCallBack },
            getElapsedTime: function() { return _elapsedTime },
            start: _start,
            stop: _stop,
            reset: _reset
        };
    }
}