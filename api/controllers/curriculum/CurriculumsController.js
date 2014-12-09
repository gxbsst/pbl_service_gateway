module.exports = {

  index: function(req, res) {
    return res.fill(Curriculum.Curriculum.find());
  },

  show: function(req, res) {
    return res.fill(Curriculum.Curriculum.findOne({_id: req.param('id')}));
  }

};
