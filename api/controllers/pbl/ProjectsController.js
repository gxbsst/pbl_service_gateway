var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.Project',

  show: function (req, res) {
    return res.fill(Pbl.Project.$$findOne({where: _.merge({_id: req.param('id')}, req.query)}).then(function (project) {

      var findTechniques;
      var findStandardItems;
      var findRules;

      if (project.techniques
        && _.isArray(project.techniques)
        && project.techniques.length > 0) {
        findTechniques = Skill.Technique.$$find({where: {_id: project.techniques.join()}});
      }

      if (project.standard_items
        && _.isArray(project.standard_items)
        && project.standard_items.length > 0) {
        findStandardItems = Curriculum.StandardItem.$$find({where: {_id: project.standard_items.join()}});
      }

      if (project.rules
        && _.isArray(project.rules)
        && project.rules.length > 0) {
        findRules = Pbl.Rule.$$find({where: {_id: project.rules.join()}});
      }

      return Promise.join(findTechniques, findStandardItems, findRules, function (techniques, standard_items, rules) {
        if (techniques) {
          project.techniques = techniques;
        }
        if (standard_items) {
          project.standard_items = standard_items;
        }
        if (rules) {
          project.rules = rules;
        }
        return project;
      })

    }));
  }

};
