module.exports = {

  index: function (req, res) {
    return res.fill(Curriculum.Phase.find(req.query));
  },

  show: function (req, res) {
    return res.fill(Curriculum.Phase.findOne(_.merge({_id: req.param('id')}, req.query)));
  }

};
