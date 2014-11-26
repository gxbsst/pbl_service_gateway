var Promise = require("bluebird");

module.exports = function () {

  var Authenticator = {
    authenticate: function (password, callback) {
      var self = this;
      User.request({
        method: 'post',
        path: '/sessions',
        data: {login: self.email, password: password},
        callback: callback
      });
    }
  }

  return {
    ask: function (id, password) {
      var def = Promise.defer();
      // 反思此处到底需要这么做吗？ 两次网络数据获取，两次数据库查询。
      User.findOne({id: id}).then(function (user) {
        var authenticator = _.extend(user, Authenticator);
        authenticator.authenticate(password, def.callback);
      }).error(function (err) {
        def.reject(err);
      });
      return def.promise;
    }
  }
}
