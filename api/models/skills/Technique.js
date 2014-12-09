module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    title: {
      type: 'string'
    },
    position: {
      type: 'integer'
    },
    category: {
      model: 'Category'
    }
  },

  namespace: 'skill'

};
