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
    category_id: {
      type: 'string'
    },
    techniques: {
      type: 'array'
    }
  },

  identity: 'Skill.SubCategory'

};
