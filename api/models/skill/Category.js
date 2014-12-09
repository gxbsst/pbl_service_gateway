module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    name: {
      type: 'string'
    },
    position: {
      type: 'integer'
    },
    skill: {
      model: 'Skill'
    },
    techniques: {
      collection: 'Skill.Technique'
    }
  },

  identity: 'Skill.Category'

};
