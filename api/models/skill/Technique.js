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
    sub_category_id: {
      type: 'string'
    }
  },

  identity: 'Skill.Technique'

};
