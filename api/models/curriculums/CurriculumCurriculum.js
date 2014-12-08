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
      model: 'CurriculumPhase'
    },
    items: {
      collection: 'CurriculumCurriculumitem'
    }
  }

};
