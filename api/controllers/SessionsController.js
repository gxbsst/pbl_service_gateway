/**
 * SessionsController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req, res) {
    return res.fill(Session._create(req.body.email, req.body.password));
  }

};

