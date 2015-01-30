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
      }
    ],
    show: [
      {
        param: 'clazzs',
        model: 'Clazz',
        via: 'owner_id',
        reserved: true,
        embed: 'clazz'
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
