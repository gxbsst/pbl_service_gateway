// Rest Custom Error Object
var RestError = function (code, message, meta) {
  this.code = code || 500;
  this.name = "RestError";
  this.message = message || "REST Error Message";
  this.meta = meta || {};
}

RestError.prototype = new Error();
RestError.prototype.constructor = RestError;

module.exports = RestError;
