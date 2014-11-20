/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)'
 * );
 * ```
 */

module.exports = function badRequest(data) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(400);

    // Log error to console
    if (data !== undefined) {
        sails.log.verbose('Sending 400 ("Bad Request") response: \n', data);
    }
    else sails.log.verbose('Sending 400 ("Bad Request") response');

    var msg = 'Bad Request! ';
    if (data) {
        msg += data;
    }
    return res.json(400, { code: 400, message: msg });

};

