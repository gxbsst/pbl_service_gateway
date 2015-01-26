module.exports = {

  resource: 'Curriculum.StandardItem',

  include: {
    index: [
      {
        param: 'standards',
        model: 'Curriculum.Standard',
        via: 'standard_id'
      }
    ]
  }

};
