"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCache = exports.setCache = void 0;
var namespace = "MISERVICE-DATA";

var setCache = function setCache(key, value) {
  if (!window[namespace]) {
    window[namespace] = {};
  }

  window[namespace][key] = value;
};

exports.setCache = setCache;

var getCache = function getCache(key) {
  var stark = window[namespace];
  return stark && stark[key] ? stark[key] : null;
};

exports.getCache = getCache;