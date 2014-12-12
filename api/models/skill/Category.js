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
    sub_categories: {
      type: 'array'
    }
  },

  identity: 'Skill.Category'

};
