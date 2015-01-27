module.exports = {

  resource: 'FriendShip',

  include: {
    index: [
      {
        param: 'users',
        model: 'User',
        via: 'user_id'
      },
      {
        param: 'friends',
        model: 'User',
        via: 'friend_id'
      }
    ]
  }

};
