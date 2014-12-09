/**
 * Skill_CategoriesController
 *
 * @description :: Server-side logic for managing skill categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  show: function (req, res) {
    return res.fill(Skill.Category.findOne(_.merge({_id: req.param('id')}, req.query)));
  },

  create: function (req, res) {
    return res.fill(Skill.Category.create(_.merge({skill_id: req.body.category.skill.id}, req.body.category)));
  },

  update: function (req, res) {
    return res.fill(Skill.Category.findOne({_id: req.param('id')}).then(function (category) {
      _.extend(category, req.body.category);
      return category.save();
    }));
  },

  destroy: function (req, res) {
    return res.fill(Skill.Category.findOne({_id: req.param('id')}).then(function (category) {
      _.extend(category, req.body.category);
      return category.destroy();
    }));
  }

};

