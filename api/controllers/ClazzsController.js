/**
 * ClazzsController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  resource: 'Clazz',

  join: [
    {
      model: 'Invitation',
      type: 'Clazz',
      embed: 'clazz_code',
      attribute: 'code'
    }
  ]

};

