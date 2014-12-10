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
    standards: {
      collection: 'Curriculum.Standard'
    }
  },

  identity: 'Curriculum.Phase'

};
