// var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.Project',

  release: function (req, res) {
    return res.fill(Pbl.Project.$$action({method: 'update', action: 'release', where: {_id: req.param('id')}}));
  }

};
