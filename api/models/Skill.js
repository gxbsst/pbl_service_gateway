/**
 * 技能
 */
module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    title: {
      type: 'string'
    },
    categories: {
      collection: 'Category'
    }
  }

};
