'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bind;
function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};;
module.exports = exports.default;
