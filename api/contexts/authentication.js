var Promise = require("bluebird");

module.exports = function () {

  var Authenticator = {
    authenticate: function (password) {
      var self = this;
      return RestClient.post('/sessions', {login: self.email, password: password});
    }
  }

  return {
    ask: function (id, password) {
      return User.findOne({_id: id}).then(function (user) {
        var authenticator = _.extend(user, Authenticator);
        return authenticator.authenticate(password);
      })
    }
  }
}
