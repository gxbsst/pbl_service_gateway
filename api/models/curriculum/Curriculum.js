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
      model: 'Curriculum.Phase'
    },
    items: {
      collection: 'Curriculum.CurriculumItem'
    }
  },

  identity: 'Curriculum.Curriculum'

};
