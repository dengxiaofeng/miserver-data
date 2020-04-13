"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "MISERVICE-DATA";
exports.setCache = function (key, value) {
    if (!window[namespace]) {
        window[namespace] = {};
    }
    window[namespace][key] = value;
};
exports.getCache = function (key) {
    var stark = window[namespace];
    return stark && stark[key] ? stark[key] : null;
};
//# sourceMappingURL=cache.js.map