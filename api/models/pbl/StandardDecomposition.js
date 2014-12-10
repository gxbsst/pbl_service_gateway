/**
 * 课标分解
 */

module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    role: {
      type: 'string'
    },
    verb: {
      type: 'string'
    },
    technique: {
      type: 'string'
    },
    noun: {
      type: 'string'
    },
    product_name: {
      type: 'string'
    },
    project: {
      model: 'Pbl.Project'
    }
  },

  identity: 'Pbl.StandardDecomposition'

};
