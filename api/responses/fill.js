/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.fill(query);
 *
 * @param  {Object} promise - promise
 */

module.exports = function fill(promise) {

  var res = this.res;

  promise.then(function (data) {
    return res.json(data);
  }).error(function (err) {
    var code = 500;
    if (err && err.originalError && err.originalError.code) {
      code = err.originalError.code;
    }
    return res.err(code, err.details);
  });

}
