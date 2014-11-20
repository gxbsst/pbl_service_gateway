/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */

module.exports = function forbidden (data) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(403);

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 403 ("Forbidden") response: \n',data);
  }
  else sails.log.verbose('Sending 403 ("Forbidden") response');

    var msg = 'Forbidden! ';
    if (data) {
        msg += data;
    }
    return res.json(403, { code: 403, message: msg });
};

