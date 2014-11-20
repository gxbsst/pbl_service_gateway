/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.fill(promise);
 *
 * @param  {Object} promise - promise
 */

module.exports = function fill(promise) {

    var res = this.res;

    promise.then(function (data) {
        return res.send(data);
    }).fail(function (err) {
        var code = 500;
        if (err && err.originalError && err.originalError.code) {
            code = err.originalError.code;
        }
        return res.send(code, { code: code, message: err.details });
    });
}