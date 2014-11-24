/**
 * SessionsController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req, res) {
    return res.fill(Session.create({email: req.body.email, password: req.body.password}));
  }

};

