var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.Technique',

  index: function (req, res) {
    if (req.query.include === 'techniques') {
      return res.fill(Pbl.Technique.$$find({where: req.query}).then(function (result) {
        var def = Promise.defer();
        try {
          var techniqueIds = _.pluck(result.data, 'technique_id');

          Skill.Technique.$$find({where: {_id: techniqueIds.join()}}).then(function (includedResult) {
            try {
              _.each(result.data, function (item) {
                _.each(includedResult.data, function (technique) {
                  if (item.technique_id === technique.id) {
                    delete item.technique_id;
                    item.technique = technique;
                  }
                })
              });
              def.callback(null, result);
            } catch (err) {
              def.callback(err);
            }
          }).catch(function () {
            def.callback(null, result);
          });

          return def.promise;
        } catch (error) {
          def.callback(error);
        }
      }));
    } else {
      res.fill(Pbl.Technique.$$find({where: req.query}));
    }
  }

};
