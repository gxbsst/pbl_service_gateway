module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    content: {
      type: 'string'
    },
    position: {
      type: 'integer'
    },
    curriculum: {
      model: 'Curriculum.Curriculum'
    }
  },

  identity: 'Curriculum.CurriculumItem'

};