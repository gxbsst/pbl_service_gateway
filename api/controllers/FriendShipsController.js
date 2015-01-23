module.exports = {

  resource: 'FriendShip',

  include: [
    {
      param: 'clazzs',
      model: 'Clazz',
      via: 'clazz_id'
    }
  ]

};
