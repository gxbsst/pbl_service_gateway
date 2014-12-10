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
    phase: {
      model: 'Curriculum.Phase'
    },
    items: {
      collection: 'Curriculum.StandardItem'
    }
  },

  identity: 'Curriculum.Standard'

};
