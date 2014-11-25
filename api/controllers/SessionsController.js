/**
 * SessionsController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var authorization = require('../contexts/Authorization');

module.exports = {

  create: function (req, res) {
    return res.fill(authorization(req.body.login, req.body.password).auth());
  }

};

