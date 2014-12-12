/**
 * Skill_CategoriesController
 *
 * @description :: Server-side logic for managing skill categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  show: function (req, res) {
    Skill.SubCategory.proxyShow(req, res);
  },

  create: function (req, res) {
    Skill.SubCategory.proxyCreate(req, res);
  },

  update: function (req, res) {
    Skill.SubCategory.proxyUpdate(req, res);
  },

  destroy: function (req, res) {
    Skill.SubCategory.proxyDestroy(req, res);
  }

};

