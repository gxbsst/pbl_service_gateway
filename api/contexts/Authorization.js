var Promise = require("bluebird");

module.exports = function (login, password) {

  var Authorizer = {
    authorize: function () {
      var self = this;
      var def = Promise.defer();
      User.request({
        method: 'post',
        path: '/sessions',
        data: {login: self.login, password: self.password},
        callback: def.callback
      });
      return def.promise;
    }
  }

  // 需要的时候再使用： new Model._model(options)
  // var user = new User._model({email: email, password: password});

  var user = {login: login, password: password};
  var authorizer = _.extend(user, Authorizer);

  return {
    auth: function () {
      return authorizer.authorize();
    }
  }
}
