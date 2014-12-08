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
      model: 'CurriculumSubject'
    },
    curriculums: {
      collection: 'CurriculumCurriculum'
    }
  }

};
