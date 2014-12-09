module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    title: {
      type: 'string'
    },
    subject: {
      model: 'Curriculum.Subject'
    },
    curriculums: {
      collection: 'Curriculum.Curriculum'
    }
  },

  identity: 'Curriculum.Phase'

};
