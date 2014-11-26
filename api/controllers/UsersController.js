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
    return res.fill(User.create(req.body.user));
  },

  show: function (req, res) {
    return res.fill(User.find({_id: req.param('id')}));
  },

  authenticate: function (req, res) {
    return res.fill(authentication().ask(req.param('id'), req.body.password));
  }

};

