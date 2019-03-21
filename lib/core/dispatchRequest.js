"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dispatchRequest;

var _combineURLs = require("./../helpers/combineURLs");

var _combineURLs2 = _interopRequireDefault(_combineURLs);

var _isAbsoluteURL = require("./../helpers/isAbsoluteURL");

var _isAbsoluteURL2 = _interopRequireDefault(_isAbsoluteURL);

var _defaults = require("../defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _isCancel = require("../cancel/isCancel");

var _isCancel2 = _interopRequireDefault(_isCancel);

var _transformData = require("./transformData");

var _transformData2 = _interopRequireDefault(_transformData);

var _utils = require("./../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !(0, _isAbsoluteURL2.default)(config.url)) {
    config.url = (0, _combineURLs2.default)(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = (0, _transformData2.default)(config.data, config.headers, config.transformRequest);

  // Flatten headers
  config.headers = _utils2.default.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

  _utils2.default.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });

  var adapter = config.adapter || _defaults2.default.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = (0, _transformData2.default)(response.data, response.headers, config.transformResponse);

    return response;
  }, function onAdapterRejection(reason) {
    if (!(0, _isCancel2.default)(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = (0, _transformData2.default)(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};;
module.exports = exports.default;
