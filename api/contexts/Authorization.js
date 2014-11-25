var Promise = require("bluebird");

module.exports = function (email, password) {

  var Authorizer = {
    authorize: function () {
      var self = this;
      var def = Promise.defer();
      User.request({
        method: 'post',
        path: '/sessions',
        data: {login: self.email, password: self.password},
        callback: def.callback
      });
      return def.promise;
    }
  }

  var user = new User._model({email: email, password: password});
  var authorizer = _.extend(user, Authorizer);

  return {
    auth: function () {
      return authorizer.authorize();
    }
  }
}
