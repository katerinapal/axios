var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL = 'http://127.0.0.1:3000/api';
var BODY = {
  foo: 'bar',
  baz: 1234
};

function handleSuccess(data) {
  console.log(data);
}
function handleFailure(data) {
  console.log('error', data);
}

// GET
_index2.default.get(URL, { params: BODY }).then(handleSuccess).catch(handleFailure);

// POST
_index2.default.post(URL, BODY).then(handleSuccess).catch(handleFailure);
