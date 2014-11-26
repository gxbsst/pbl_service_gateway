// Rest Custom Error Object
var RestError = function (code, message, meta) {
  this.code = code || 500;
  this.name = "RestError";
  this.message = message || "REST Error Message";
  this.meta = meta || {};
}

RestError.prototype = new Error();
RestError.prototype.constructor = RestError;

RestError.handleError = function (err, req, res, data) {
  var restError,
  // check if response code is in 4xx or 5xx range
    responseErrorCode = res && /^(4|5)\d+$/.test(res.statusCode.toString());

  if (err && ( res === undefined || res === null || responseErrorCode )) {
    var code, message;
    if (res && res.statusCode) {
      code = res.statusCode;
    }
    if (err && err.message) {
      message = err.message;
    }
    restError = new RestError(code, message, {req: req, res: res, data: data});
    sails.log.error('from rest service. path:' + req.path + ', code: ' + restError.code + ', message: ' + restError.message);
  }

  return restError;
}

module.exports = RestError;
