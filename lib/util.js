"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString = Object.prototype.toString;
function isObject(o) {
    return toString.call(o) === '[object Object]';
}
exports.isObject = isObject;
function isArray(a) {
    return toString.call(a) === '[object Array]';
}
exports.isArray = isArray;
function warn(message) {
    return console && console.warn(message);
}
exports.warn = warn;
//# sourceMappingURL=util.js.map