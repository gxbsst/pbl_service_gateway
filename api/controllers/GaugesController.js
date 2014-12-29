var Promise = require('bluebird');

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
    return res.fill(Gauge.$$action({method: 'find', handler: 'recommends', where: req.query}).then(function (result) {
      var def = Promise.defer();

      if (_.isString(req.query.include)
        && _.contains(req.query.include.split(','), 'techniques')
        && result.data) {

        var viaIds = [];
        _.each(result.data, function (recommend) {
          _.each(recommend.gauges, function (gauge) {
            if (gauge.technique_id && !_.contains(viaIds, gauge.technique_id)) {
              viaIds.push(gauge.technique_id);
            }
          });
        });

        if (_.isEmpty(viaIds)) {
          def.callback(null, result);
          return def.promise;
        }

        Skill.Technique.$$find({where: {_id: viaIds.join()}}).then(function (techniques) {
          _.each(result.data, function (recommend) {
            _.each(recommend.gauges, function (gauge) {
              if (gauge.technique_id) {
                var technique = _.find(techniques, {id: gauge.technique_id});
                if (technique) {
                  gauge.technique = technique;
                  delete gauge.technique_id;
                }
              }
            });
          });
        }).finally(function () {
          def.callback(null, result);
        });

      } else {
        def.callback(null, result);
      }

      return def.promise;
    }));
  }
};
