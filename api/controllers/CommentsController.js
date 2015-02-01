module.exports = {

  resource: 'Comment',

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
  }

};
