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

  create: function (req, res) {
    return res.fill(User.create(req.body));
  },

  authenticate: function (req, res) {
    return res.fill(authentication().ask(req.query.id, req.body.password));
  }

};

