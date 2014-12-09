module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    title: {
      type: 'string'
    },
    phase: {
      model: 'Phase'
    },
    items: {
      collection: 'CurriculumItem'
    }
  },

  namespace: 'curriculum'

};
