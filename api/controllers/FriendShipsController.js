module.exports = {

  resource: 'FriendShip',

  include: {
    index: [
      {
        param: 'clazzs',
        model: 'Clazz',
        via: 'clazz_id'
      }
    ]
  }

};
