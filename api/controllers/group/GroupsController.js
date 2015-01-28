module.exports = {

  resource: 'Group.Group',

  join: [
    {
      model: 'Invitation',
      type: 'Group',
      embed: 'invitation_code',
      attribute: 'code'
    }
  ]

};
