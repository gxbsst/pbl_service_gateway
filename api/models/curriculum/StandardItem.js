module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    content: {
      type: 'string'
    },
    position: {
      type: 'integer'
    },
    standard_id: {
      type: 'string'
    }
  },

  identity: 'Curriculum.StandardItem'

};
