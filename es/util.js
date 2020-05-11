var toString = Object.prototype.toString;
export function isObject(o) {
  return toString.call(o) === '[object Object]';
}
export function isArray(a) {
  return toString.call(a) === '[object Array]';
}
export function warn(message) {
  return console && console.warn(message);
}