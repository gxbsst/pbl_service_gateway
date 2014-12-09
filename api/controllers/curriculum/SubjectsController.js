module.exports = {

  index: function (req, res) {
    return res.fill(Curriculum.Subject.find(res.query));
  },

  show: function (req, res) {
    return res.fill(Curriculum.Subject.findOne(_.merge({_id: req.param('id')}, req.query)));
  }

};
