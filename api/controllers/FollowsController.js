module.exports = {

  resource: 'Follow',

  include: {
    index: [
      {
        param: 'users',
        model: 'User',
        via: 'user_id'
      }
    ]
  }

};
