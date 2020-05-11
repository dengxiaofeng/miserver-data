import { isArray, warn } from "./util";
import { setCache, getCache } from "./cache";
var eventNameSpace = 'event';

var Event =
/** @class */
function () {
  function Event() {
    this.eventEmitter = {};
  }

  Event.prototype.emit = function (key) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var keyEmitter = this.eventEmitter[key];

    if (!isArray(keyEmitter) || isArray(keyEmitter) && keyEmitter.length === 0) {
      warn("event.emit: no callback is called for " + key);
      return;
    }

    keyEmitter.forEach(function (cb) {
      cb.apply(void 0, args);
    });
  };

  Event.prototype.on = function (key, callback) {
    if (typeof key !== 'string') {
      warn('event.on: key should be string');
      return;
    }

    if (callback === undefined || typeof callback !== 'function') {
      warn('event.on: callback is required, should be function');
      return;
    }

    if (!this.eventEmitter[key]) {
      this.eventEmitter[key] = [];
    }

    this.eventEmitter[key].push(callback);
  };

  Event.prototype.off = function (key, callback) {
    if (typeof key !== 'string') {
      warn('event.off: key should be string');
      return;
    }

    if (!isArray(this.eventEmitter[key])) {
      warn("event.off: " + key + " has no callback");
      return;
    }

    if (callback === undefined) {
      this.eventEmitter[key] = undefined;
      return;
    }

    this.eventEmitter[key] = this.eventEmitter[key].filter(function (cb) {
      return cb !== callback;
    });
  };

  Event.prototype.has = function (key) {
    var keyEmitter = this.eventEmitter[key];
    return isArray(keyEmitter) && keyEmitter.length > 0;
  };

  return Event;
}();

var event = getCache(eventNameSpace);

if (!event) {
  event = new Event();
  setCache(eventNameSpace, event);
}

export default event;