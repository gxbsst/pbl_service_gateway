// var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.Project',

  release: function (req, res) {
    return res.fill(Pbl.Project.$$action({method: 'create', action: 'release', where: {_id: req.param('id')}}));
  }

};
