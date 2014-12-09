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
      collection: 'Phase'
    }
  },

  namespace: 'Curriculum'

};
