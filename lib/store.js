"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util");

var _cache = require("./cache");

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

    if (!(0, _util.isArray)(keyEmitter) || (0, _util.isArray)(keyEmitter) && keyEmitter.length === 0) {
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
      (0, _util.warn)("store.get: key should be string");
      return null;
    }

    return this._getValue(key);
  };

  Store.prototype.set = function (key, value) {
    var _this = this;

    if (typeof key !== 'string') {
      if (!(0, _util.isObject)(key)) {
        (0, _util.warn)('store.set: key should be string / object');
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
      (0, _util.warn)('store.on: key should be string');
      return;
    }

    if (callback === undefined || typeof callback !== 'function') {
      (0, _util.warn)('store.on: callback is required, should be function');
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
      (0, _util.warn)('store.off: key should be string');
      return;
    }

    if (!(0, _util.isArray)(this.storeEmitter[key])) {
      (0, _util.warn)("store.off: " + key + " has no callback");
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
    return (0, _util.isArray)(keyEmitter) && keyEmitter.length > 0;
  };

  return Store;
}();

var store = (0, _cache.getCache)(storeNameSpace);

if (!store) {
  store = new Store();
  (0, _cache.setCache)(storeNameSpace, store);
}

var _default = store;
exports.default = _default;