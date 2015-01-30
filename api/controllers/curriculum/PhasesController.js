module.exports = {

  resource: 'Curriculum.Phase',

  include: {
    index: [
      {
        param: 'subjects',
        model: 'Curriculum.Subject',
        via: 'subject_id'
      }
    ]
  }

};
