module.exports = {

  resource: 'Pbl.Rule',

  include: {
    index: [
      {
        param: 'techniques',
        model: 'Skill.Technique',
        via: 'technique_id'
      },
      {
        param: 'gauges',
        model: 'Gauge',
        via: 'gauge_id'
      }
    ]
  },

  create: function (req, res) {
    return res.fill(Pbl.Rule.$$create(req.body.rule).then(function (rule) {
      return Gauge.$$action({method: 'update', action: 'increase', where: {_id: rule.gauge_id}});
    }));
  },

  destroy: function (req, res) {
    return res.fill(Pbl.Rule.$$destroy({where: {_id: req.param('id')}}).then(function (result) {
      return Pbl.Rule.$$findOne({where: {_id: result.id}}).then(function (rule) {
        return Gauge.$$action({method: 'update', action: 'decrease', where: {_id: rule.gauge_id}});
      });
    }));
  }
};
