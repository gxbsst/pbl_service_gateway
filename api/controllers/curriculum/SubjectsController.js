module.exports = {

  index: function(req, res) {
    return res.fill(Curriculum.Subject.find());
  },

  show: function(req, res) {
    return res.fill(Curriculum.Subject.findOne({_id: req.param('id')}));
  }

};
