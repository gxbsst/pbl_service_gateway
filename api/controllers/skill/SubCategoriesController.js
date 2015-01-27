/**
 * Skill_CategoriesController
 *
 * @description :: Server-side logic for managing skill categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  resource: 'Skill.SubCategory',

  include: {
    index: [
      {
        param: 'categories',
        model: 'Skill.Category',
        via: 'category_id'
      }
    ]
  }

};

