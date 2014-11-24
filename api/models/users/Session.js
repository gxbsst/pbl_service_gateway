/**
 * users/session.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Assist = require("../../helpers/Assist");

module.exports = {

  attributes: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },

  _create: function (email, password) {
    return Assist.makePromiseByExec(Session.create({ email: email, password: password }));
  }

};

