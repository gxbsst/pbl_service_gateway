module.exports = {

  resource: 'Curriculum.Standard',

  include: {
    index: [
      {
        param: 'phases',
        model: 'Curriculum.Phase',
        via: 'phase_id',
        include: 'subjects'
      }
    ]
  }

};
