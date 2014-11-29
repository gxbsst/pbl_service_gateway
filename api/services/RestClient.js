var Promise = require("bluebird"),
  RestError = require('../errors/RestError'),
  connections = require('../adapters/restAdapter').connections;

module.exports = {

  connection: 'baseServiceV1',

  request: function (method, path, option, callback) {
    var def = Promise.defer();
    var client = connections[this.connection].connection;
    if (option) {
      client[method](path, option, function (err, req, res, obj) {
        var error = RestError.handleError(err, req, res, obj) || err;
        if (_.isFunction(callback)) {
          callback(error, obj);
        }
        def.callback(error, obj);
      });
    } else {
      client[method](path, function (err, req, res, obj) {
        var error = RestError.handleError(err, req, res, obj) || err;
        if (_.isFunction(callback)) {
          callback(error, obj);
        }
        def.callback(error, obj);
      });
    }
    return def.promise;
  },

  get: function (path, callback) {
    return this.request('get', path, null, callback);
  },

  post: function (path, option, callback) {
    return this.request('post', path, option, callback);
  },

  delete: function (path, option, callback) {
    return this.request('delete', path, option, callback);
  },

  patch: function (path, option, callback) {
    return this.request('patch', path, option, callback);
  }
}
