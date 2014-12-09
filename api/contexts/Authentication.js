/**
 * 认证场景(context)
 */
module.exports = (function () {
  "use strict";

  // 认证对象
  var authenticator = null;

  // 认证角色
  var Authenticator = {
    authenticate: function (password) {
      var self = this;
      return RestClient.post('/sessions', {login: self.email, password: password});
    }
  };

  return {
    ask: function (id, password) {
      return User.findOne({_id: id}).then(function (user) {
        // 扩展用户为认证对象
        authenticator = _.extend(user, Authenticator);
        // 认证对象使用密码进行认证
        return authenticator.authenticate(password);
      })
    }
  }
})();
