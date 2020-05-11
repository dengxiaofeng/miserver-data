import { isObject, isArray, warn } from "./util";
import { setCache, getCache } from "./cache";
var storeNameSpace = 'store';

var Store =
/** @class */
function () {
  function Store() {
    this.store = {};
    this.storeEmitter = {};
  }

  Store.prototype._getValue = function (key) {
    return this.store[key];
  };

  Store.prototype._setValue = function (key, value) {
    this.store[key] = value;

    this._emit(key);
  };

  Store.prototype._emit = function (key) {
    var keyEmitter = this.storeEmitter[key];

    if (!isArray(keyEmitter) || isArray(keyEmitter) && keyEmitter.length === 0) {
      return;
    }

    var value = this._getValue(key);

    keyEmitter.forEach(function (cb) {
      cb(value);
    });
  };

  Store.prototype.get = function (key) {
    if (key === undefined) {
      return this.store;
    }

    if (typeof key !== 'string') {
      warn("store.get: key should be string");
      return null;
    }

    return this._getValue(key);
  };

  Store.prototype.set = function (key, value) {
    var _this = this;

    if (typeof key !== 'string') {
      if (!isObject(key)) {
        warn('store.set: key should be string / object');
        return;
      }

      Object.keys(key).forEach(function (k) {
        var v = key[k];

        _this._setValue(k, v);
      });
    }

    this._setValue(key, value);
  };

  Store.prototype.on = function (key, callback, force) {
    if (typeof key !== 'string') {
      warn('store.on: key should be string');
      return;
    }

    if (callback === undefined || typeof callback !== 'function') {
      warn('store.on: callback is required, should be function');
      return;
    }

    if (!this.storeEmitter[key]) {
      this.storeEmitter[key] = [];
    }

    this.storeEmitter[key].push(callback);

    if (force) {
      callback(this._getValue(key));
    }
  };

  Store.prototype.off = function (key, callback) {
    if (typeof key !== 'string') {
      warn('store.off: key should be string');
      return;
    }

    if (!isArray(this.storeEmitter[key])) {
      warn("store.off: " + key + " has no callback");
      return;
    }

    if (callback === undefined) {
      this.storeEmitter[key] = undefined;
      return;
    }

    this.storeEmitter[key] = this.storeEmitter[key].filter(function (cb) {
      return cb !== callback;
    });
  };

  Store.prototype.has = function (key) {
    var keyEmitter = this.storeEmitter[key];
    return isArray(keyEmitter) && keyEmitter.length > 0;
  };

  return Store;
}();

var store = getCache(storeNameSpace);

if (!store) {
  store = new Store();
  setCache(storeNameSpace, store);
}

export default store;