module.exports = {

  resource: 'Feed.Message',

  include: {
    index: [
      {
        param: 'sender',
        model: 'User',
        via: 'sender_id',
        embed: 'sender'
      }
    ],
    show: [
      {
        param: 'sender',
        model: 'User',
        via: 'sender_id',
        embed: 'sender'
      }
    ]
  }

};
