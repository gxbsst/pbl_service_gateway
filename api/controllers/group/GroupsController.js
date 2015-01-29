module.exports = {

  resource: 'Group.Group',

  include: {
      show: [
        {
          param: 'clazzs',
          model: 'Clazz',
          via: 'owner_id',
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
