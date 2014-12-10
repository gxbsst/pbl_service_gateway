/**
 * SkillsController
 *
 * @description :: Server-side logic for managing skills
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req, res) {
    Skill.proxyIndex(req, res);
  },

  show: function (req, res) {
    Skill.proxyShow(req, res);
  },

  update: function (req, res) {
    Skill.proxyUpdate(req, res);
  },

  create: function (req, res) {
    Skill.proxyCreate(req, res);
  },

  destroy: function (req, res) {
    Skill.proxyDestroy(req, res);
  }
};

