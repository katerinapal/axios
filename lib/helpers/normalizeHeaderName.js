"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeHeaderName;

var _utils = require("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

function normalizeHeaderName(headers, normalizedName) {
  _utils2.default.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};;
module.exports = exports.default;
