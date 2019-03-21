"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xhr = require("./adapters/xhr");

var _xhr2 = _interopRequireDefault(_xhr);

var _http = require("./adapters/http");

var _http2 = _interopRequireDefault(_http);

var _normalizeHeaderName = require("./helpers/normalizeHeaderName");

var _normalizeHeaderName2 = _interopRequireDefault(_normalizeHeaderName);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!_utils2.default.isUndefined(headers) && _utils2.default.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = _http2.default;
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = _xhr2.default;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    (0, _normalizeHeaderName2.default)(headers, 'Accept');
    (0, _normalizeHeaderName2.default)(headers, 'Content-Type');
    if (_utils2.default.isFormData(data) || _utils2.default.isArrayBuffer(data) || _utils2.default.isBuffer(data) || _utils2.default.isStream(data) || _utils2.default.isFile(data) || _utils2.default.isBlob(data)) {
      return data;
    }
    if (_utils2.default.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (_utils2.default.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (_utils2.default.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {/* Ignore */}
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

exports.default = defaults;


defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

_utils2.default.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

_utils2.default.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = _utils2.default.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = exports.default;
