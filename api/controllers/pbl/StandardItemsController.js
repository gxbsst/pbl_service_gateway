var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.StandardItem',

  index: function (req, res) {
    return res.fill(Pbl.StandardItem.$$find({where: req.query}).then(function (result) {
      var def = Promise.defer();

      if (req.query.include === 'standard_items') {
        if (!_.isEmpty(result.data)) {
          var itemIds = _.pluck(result.data, 'standard_item_id');

          Curriculum.StandardItem.$$find({where: {_id: itemIds.join()}}).then(function (includedResult) {
            if (!_.isEmpty(includedResult.data)) {
              _.each(result.data, function (item) {
                var standardItem = _.find(includedResult.data, {id: item.standard_item_id});
                if (standardItem) {
                  delete item.standard_item_id;
                  item.standard_item = standardItem;
                }
              });
            }
          }).finally(function () {
            def.callback(null, result);
          });
        }
      } else {
        def.callback(null, result);
      }

      return def.promise;
    }));
  }

};
