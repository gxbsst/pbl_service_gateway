var Promise = require("bluebird");

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
      var def = Promise.defer();
      if (rule.gauge_id) {
        Gauge.$$action({method: 'update', action: 'increase', where: {_id: rule.gauge_id}}).then();
      }
      def.callback(null, rule);
      return def.promise;
    }));
  },

  destroy: function (req, res) {
    return res.fill(Pbl.Rule.$$destroy({where: {_id: req.param('id')}}).then(function (result) {
      var def = Promise.defer();
      if (result.gauge_id) {
        Gauge.$$action({method: 'update', action: 'decrease', where: {_id: result.gauge_id}}).then();
      }
      def.callback(null, result);
      return def.promise;
    }));
  }
};
