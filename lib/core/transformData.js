"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformData;

var _utils = require("./../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  _utils2.default.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};;
module.exports = exports.default;
