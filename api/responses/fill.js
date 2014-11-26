/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.fill(promise);
 *
 * @param  {Object} promise - promise
 */

var RestError = require('../errors/RestError');

module.exports = function fill(promise) {

  var res = this.res;

  promise.then(function (data) {
    return res.json(data);
  }).catch(RestError, function (err) {
    return res.err(err.code, err.message);
  }).catch(function (err) {
    if (err.originalError && err.originalError instanceof RestError) {
      return res.err(err.originalError.code, err.originalError.message);
    }
    return res.err(err.statusCode || 500, err.toString());
  });

}
