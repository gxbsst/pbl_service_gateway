var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.StandardItem',

  index: function (req, res) {
    if (req.query.include === 'standard_items') {
      return res.fill(Pbl.StandardItem.$$find({where: req.query}).then(function (result) {
        var def = Promise.defer();
        try {
          var itemIds = _.pluck(result.data, 'standard_item_id');

          Curriculum.StandardItem.$$find({where: {_id: itemIds.join()}}).then(function (includedResult) {
            try {
              _.each(result.data, function (item) {
                _.each(includedResult.data, function (standardItem) {
                  if (item.standard_item_id === standardItem.id) {
                    delete item.standard_item_id;
                    item.standard_item = standardItem;
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
      res.fill(Pbl.StandardItem.$$find({where: req.query}));
    }
  }

};
