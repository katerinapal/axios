import spread from "./helpers/spread";
import isCancel from "./cancel/isCancel";
import CancelToken from "./cancel/CancelToken";
import Cancel from "./cancel/Cancel";
import defaults from "./defaults";
import mergeConfig from "./core/mergeConfig";
import Axios from "./core/Axios";
import bind from "./helpers/bind";
import utils from "./utils";
'use strict';

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

var axios = createInstance(defaults);

// Create the default instance to be exported
export default axios;

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

module.exports = axios;
