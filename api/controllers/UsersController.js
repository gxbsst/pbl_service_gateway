/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Authentication = require('../contexts/Authentication');

module.exports = {

  resource: 'User',

  authenticate: function (req, res) {
    return res.fill(Authentication.ask(req.param('id'), req.body.password));
  },

  include: {
    index: [
      {
        param: 'schools',
        model: 'School',
        via: 'school_id'
      }
    ],
    show: [
      {
        param: 'schools',
        model: 'School',
        via: 'school_id'
      }
    ]
  }

};

