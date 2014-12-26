module.exports = {

  resource: 'Gauge',

  include: {
    index: [
      {
        param: 'techniques',
        model: 'Skill.Technique',
        via: 'technique_id'
      }
    ]
  }
};
