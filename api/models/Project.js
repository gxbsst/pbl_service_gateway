/**
 * PBL项目
 */
module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },

    // 项目名称
    project_name: {
      type: 'string'
    },

    // 选择的课标
    curriculum_standards: {
      collection: 'CurriculumStandard'
    },

    // 选择的技能
    skills: {
      collection: 'Skill'
    },

    // 驱动性问题
    driven_issue: {
      type: 'string'
    },

    // 课标解读
    standard_analysis: {
      type: 'string'
    },

    // 课标分解
    standard_decomposition: {
      type: 'array'
    },

    // 最终产品
    final_product: {
      model: 'Product'
    },

    // 阶段性产品
    stage_products: {
      collection: 'Product'
    }
  }
};

