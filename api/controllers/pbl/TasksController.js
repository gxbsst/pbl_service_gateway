module.exports = {

  resource: 'Pbl.Task',

  release: function (req, res) {
    return res.fill(Pbl.Task.$$action({method: 'create', action: 'release', where: {_id: req.param('id')}}));
  }

};
