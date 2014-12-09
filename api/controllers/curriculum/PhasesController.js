module.exports = {

  index: function (req, res) {
    return res.fill(Curriculum.Phase.find());
  },

  show: function (req, res) {
    return res.fill(Curriculum.Phase.findOne({_id: req.param('id')}));
  }

};
