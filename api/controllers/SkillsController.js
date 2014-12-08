/**
 * SkillsController
 *
 * @description :: Server-side logic for managing skills
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req, res) {
    return res.fill(Skill.find());
  },

  show: function (req, res) {
    return res.fill(Skill.findOne(req.param('id')));
  },

  update: function (req, res) {
    return res.fill(Skill.findOne(req.param('id')).then(function (skill) {
      _.extend(skill, req.body.skill);
      return skill.save();
    }));
  },

  create: function (req, res) {
    return res.fill(Skill.create());
  },

  destroy: function (req, res) {
    return res.fill(Skill.findOne(req.param('id')).then(function (skill) {
      return skill.destroy();
    }));
  }
};

