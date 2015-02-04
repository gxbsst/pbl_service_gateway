/**
 * StudentsController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  resource: 'Student',

  include: {
    index: [
      {
        param: 'clazzs',
        model: 'Clazz',
        via: 'clazz_id'
      },
      {
        param: 'users',
        model: 'User',
        via: 'user_id'
      }
    ],
    show: [
      {
        param: 'clazzs',
        model: 'Clazz',
        via: 'clazz_id'
      },
      {
        param: 'users',
        model: 'User',
        via: 'user_id'
      }
    ]
  }

};

