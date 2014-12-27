module.exports = {

  resource: 'Gauge',

  include: {
    index: [
      {
        param: 'techniques',
        model: 'Skill.Technique',
        via: 'technique_id'
      }
    ]
  },

  recommends: function (req, res) {
    return res.fill(Gauge.$$action({method: 'find', handler: 'recommends', where: req.query}));
  }
};
