/**
 * Skill_CategoriesController
 *
 * @description :: Server-side logic for managing skill categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  show: function (req, res) {
    Skill.Category.proxyShow(req, res);
  },

  create: function (req, res) {
    Skill.Category.proxyCreate(req, res);
  },

  update: function (req, res) {
    Skill.Category.proxyUpdate(req, res);
  },

  destroy: function (req, res) {
    Skill.Category.proxyDestroy(req, res);
  }

};

