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
      model: 'Subject'
    },
    curriculums: {
      collection: 'Curriculum'
    }
  },

  namespace: 'curriculum'

};
