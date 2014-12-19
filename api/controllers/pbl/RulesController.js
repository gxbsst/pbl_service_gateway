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
  }
};
