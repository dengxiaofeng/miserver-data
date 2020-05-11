var namespace = "MISERVICE-DATA";
export var setCache = function setCache(key, value) {
  if (!window[namespace]) {
    window[namespace] = {};
  }

  window[namespace][key] = value;
};
export var getCache = function getCache(key) {
  var stark = window[namespace];
  return stark && stark[key] ? stark[key] : null;
};