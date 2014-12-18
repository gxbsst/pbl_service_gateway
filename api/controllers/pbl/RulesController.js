var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.Rule',

  index: function (req, res) {
    return res.fill(Pbl.Rule.$$find({where: req.query}).then(function (result) {
      var def = Promise.defer();

      if (!_.isEmpty(result.data)) {
        var findTechniques;
        var findGauges;

        if (_.isString(req.query.include) && _.contains(req.query.include.split(','), 'techniques')) {
          var techniqueIds = _.filter(_.pluck(result.data, 'technique_id'));
          if (!_.isEmpty(techniqueIds)) {
            findTechniques = Skill.Technique.$$find({where: {_id: techniqueIds.join()}});
          }
        }

        if (_.isString(req.query.include) && _.contains(req.query.include.split(','), 'gauges')) {
          var gaugeIds = _.filter(_.pluck(result.data, 'gauge_id'));
          if (!_.isEmpty(gaugeIds)) {
            findGauges = Gauge.$$find({where: {_id: gaugeIds.join()}});
          }
        }

        Promise.join(findTechniques, findGauges, function (techniques, gauges) {
          if (techniques && !_.isEmpty(techniques.data)) {
            _.each(result.data, function (item) {
              var technique = _.find(techniques.data, {id: item.technique_id});
              if (technique) {
                delete item.technique_id;
                item.technique = technique;
              }
            });
          }
          if (gauges && !_.isEmpty(gauges.data)) {
            _.each(result.data, function (item) {
              var gauge = _.find(gauges.data, {id: item.gauge_id});
              if (gauge) {
                delete item.gauge_id;
                item.gauge = gauge;
              }
            });
          }
          return result;
        }).then().finally(function () {
          def.callback(null, result);
        });
      } else {
        def.callback(null, result);
      }

      return def.promise;

    }));
  }

};
