var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.StandardItem',

  include: {
    index: [
      {
        param: 'standard_items',
        model: 'Curriculum.StandardItem',
        via: 'standard_item_id'
      }
    ]
  }
};
