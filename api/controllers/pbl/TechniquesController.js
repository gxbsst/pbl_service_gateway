var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.Technique',

  index: function (req, res) {
    return res.fill(Pbl.Technique.$$find({where: req.query}).then(function (result) {
      var def = Promise.defer();

      if (req.query.include === 'techniques') {
        if (!_.isEmpty(result.data)) {
          var techniqueIds = _.pluck(result.data, 'technique_id');

          Skill.Technique.$$find({where: {_id: techniqueIds.join()}}).then(function (includedResult) {
            if (!_.isEmpty(includedResult.data)) {
              _.each(result.data, function (item) {
                var technique = _.find(includedResult.data, {id: item.technique_id});
                if (technique) {
                  delete item.technique_id;
                  item.technique = technique;
                }
              });
            }
          }).finally(function () {
            def.callback(null, result);
          });
        } else {
          def.callback(null, result);
        }
      } else {
        def.callback(null, result);
      }

      return def.promise;
    }));
  }
};
