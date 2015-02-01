/**
 * ClazzsController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  resource: 'Clazz',

  include: {
    index: [
      {
        param: 'users',
        model: 'User',
        via: 'user_id'
      }
    ],
    show: [
      {
        param: 'users',
        model: 'User',
        via: 'user_id'
      }
    ]
  },

  join: [
    {
      model: 'Invitation',
      type: 'Clazz',
      embed: 'clazz_code',
      attribute: 'code'
    }
  ]

};

