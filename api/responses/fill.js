/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.fill(query);
 *
 * @param  {Object} query - query
 */

module.exports = function fill(query) {

  var res = this.res;

  query.exec(function (err, data) {
    if (err) {
      var code = 500;
      if (err && err.originalError && err.originalError.code) {
        code = err.originalError.code;
      }
      return res.err(code, err.details);
    }
    return res.json(data);
  });
}
