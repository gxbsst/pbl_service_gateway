module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    name: {
      type: 'string'
    },
    position: {
      type: 'integer'
    },
    subject_id: {
      type: 'string'
    },
    standards: {
      type: 'array'
    }
  },

  identity: 'Curriculum.Phase'

};
