/**
 * users/user.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Assist = require("../../helpers/Assist");

module.exports = {

  all: function () {
    return Assist.makePromiseByExec(User.find());
  }
};

