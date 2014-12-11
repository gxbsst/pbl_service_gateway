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
    phase_id: {
      type: "string"
    },
    items: {
      type: 'array'
    }
  },

  identity: 'Curriculum.Standard'

};
