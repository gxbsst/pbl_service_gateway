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
    phases: {
      type: 'array'
    }
  },

  identity: 'Curriculum.Subject'

};
