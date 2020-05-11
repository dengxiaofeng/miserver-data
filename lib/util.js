"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = isObject;
exports.isArray = isArray;
exports.warn = warn;
var toString = Object.prototype.toString;

function isObject(o) {
  return toString.call(o) === '[object Object]';
}

function isArray(a) {
  return toString.call(a) === '[object Array]';
}

function warn(message) {
  return console && console.warn(message);
}