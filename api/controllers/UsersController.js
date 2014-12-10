/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Authentication = require('../contexts/Authentication');

module.exports = {

  index: function (req, res) {
    User.proxyIndex(req, res);
  },

  create: function (req, res) {
    User.proxyCreate(req, res);
  },

  show: function (req, res) {
    User.proxyShow(req, res);
  },

  authenticate: function (req, res) {
    return res.fill(Authentication.ask(req.param('id'), req.body.password));
  }

};

