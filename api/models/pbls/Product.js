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
      model: 'ProductForm'
    },

    // 产品示例
    example: {
      type: 'array'
    },

    // 是否是最终产品
    is_final: {
      type: 'boolean'
    }
  }

};
