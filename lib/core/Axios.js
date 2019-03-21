"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Axios;

var _mergeConfig = require("./mergeConfig");

var _mergeConfig2 = _interopRequireDefault(_mergeConfig);

var _dispatchRequest = require("./dispatchRequest");

var _dispatchRequest2 = _interopRequireDefault(_dispatchRequest);

var _InterceptorManager = require("./InterceptorManager");

var _InterceptorManager2 = _interopRequireDefault(_InterceptorManager);

var _buildURL = require("../helpers/buildURL");

var _buildURL2 = _interopRequireDefault(_buildURL);

var _utils = require("./../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new _InterceptorManager2.default(),
    response: new _InterceptorManager2.default()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = (0, _mergeConfig2.default)(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [_dispatchRequest2.default, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = (0, _mergeConfig2.default)(this.defaults, config);
  return (0, _buildURL2.default)(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
_utils2.default.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(_utils2.default.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

_utils2.default.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(_utils2.default.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = exports.default;
