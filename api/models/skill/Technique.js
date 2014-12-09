module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    title: {
      type: 'string'
    },
    position: {
      type: 'integer'
    },
    category: {
      model: 'Skill.Category'
    }
  },

  identity: 'Skill.Technique'

};
