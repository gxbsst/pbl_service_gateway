/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Authentication = require('../contexts/Authentication');

module.exports = {

  index: function (req, res) {
    return res.fill(User.find(req.query));
  },

  create: function (req, res) {
    return res.fill(User.create(req.body.user));
  },

  show: function (req, res) {
    return res.fill(User.findOne(_.merge({_id: req.param('id')}, req.query)));
  },

  authenticate: function (req, res) {
    return res.fill(Authentication.ask(req.param('id'), req.body.password));
  }

};

