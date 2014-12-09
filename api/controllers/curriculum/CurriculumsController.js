module.exports = {

  index: function (req, res) {
    return res.fill(Curriculum.Curriculum.find());
  },

  show: function (req, res) {
    return res.fill(Curriculum.Curriculum.findOne(_.merge({_id: req.param('id')}, req.query)));
  }

};
