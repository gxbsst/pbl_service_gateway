/**
 * 产品（最终产品，阶段性产品）
 */
module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },

    // 产品描述
    description: {
      type: 'string'
    },

    // 产品形态
    form: {
      type: 'string'
    },

    // 是否是最终产品
    is_final: {
      type: 'boolean'
    },

    // 产品示例
    example: {
      type: 'array'
    },

    project_id: {
      type: 'string'
    }
  },

  identity: 'Pbl.Product'

};
