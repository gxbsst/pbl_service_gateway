/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var authentication = require('../contexts/authentication');

module.exports = {

  index: function (req, res) {
    return res.fill(User.find());
  },

  authenticate: function(req, res) {
    return res.fill(authentication().ask(req.body.id, req.body.password));
  }

};

