/**
 * Skill_CategoriesController
 *
 * @description :: Server-side logic for managing skill categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req, res) {
    return res.fill(Skill.Category.find());
  },

  show: function (req, res) {
    return res.fill(Skill.Category.findOne({_id: req.param('id')}));
  },

  create: function (req, res) {
    return res.fill(Skill.Category.create({skill_id: req.body.skill.id}));
  },

  update: function (req, res) {
    return res.fill(Skill.Category.findOne(req.param('id')).then(function (category) {
      _.extend(category, req.body.category);
      return category.save();
    }));
  },

  destroy: function (req, res) {
    return res.fill(Skill.Category.findOne(req.param('id')).then(function (category) {
      _.extend(category, req.body.category);
      return category.destroy();
    }));
  }

};

