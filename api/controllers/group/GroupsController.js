module.exports = {

  resource: 'Group.Group',

  join: [
    {
      model: 'Invitation',
      type: 'Group',
      embed: 'code',
      attribute: 'code'
    }
  ]

};
