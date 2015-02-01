module.exports = {

  resource: 'Group.Group',

  include: {
    index: [
      {
        param: 'clazzs',
        model: 'Clazz',
        via: 'owner_id',
        reserved: true,
        embed: 'clazz'
      },
      {
        param: 'users',
        model: 'User',
        via: 'owner_id',
        reserved: true,
        embed: 'user'
      }
    ],
    show: [
      {
        param: 'clazzs',
        model: 'Clazz',
        via: 'owner_id',
        reserved: true,
        embed: 'clazz'
      },
      {
        param: 'users',
        model: 'User',
        via: 'owner_id',
        reserved: true,
        embed: 'user'
      }
    ]
  },

  join: [
    {
      model: 'Invitation',
      type: 'Group',
      embed: 'invitation_code',
      attribute: 'code'
    }
  ]

};
