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

  if (promise) {
    promise.then(function (data) {
      return res.json(data);
    }).catch(RestError, function (err) {
      return res.json(err.code, err.meta.data);
    }).catch(function (err) {
      if (err.originalError && err.originalError instanceof RestError) {
        return res.json(err.originalError.code, err.originalError.meta.data);
      }
      return res.err(err.statusCode || 500, err.message || err.toString());
    });
  } else {
    res.notFound('Promise is undefined or null.');
  }

};
