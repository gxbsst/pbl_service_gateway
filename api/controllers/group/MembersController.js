module.exports = {

  resource: 'Group.Member',

  join: function (req, res) {
    return Group.Member.$$action({method: 'create', action: 'join'}, req.body);
  },

  leave: function (req, res) {
    return Group.Member.$$action({method: 'destroy', action: 'leave'}, req.body);
  }

};
