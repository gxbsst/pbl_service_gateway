var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.Project'

  //show: function (req, res) {
  //  return res.fill(Pbl.Project.$$findOne({where: _.merge({_id: req.param('id')}, req.query)}).then(function (project) {
  //
  //    var findTechniques;
  //    var findStandardItems;
  //    var findRules;
  //
  //    if (project.techniques
  //      && _.isArray(project.techniques)
  //      && project.techniques.length > 0) {
  //
  //      var techniqueIds = _.map(project.techniques, 'technique_id');
  //      findTechniques = Skill.Technique.$$find({where: {_id: techniqueIds.join()}});
  //    }
  //
  //    if (project.standard_items
  //      && _.isArray(project.standard_items)
  //      && project.standard_items.length > 0) {
  //
  //      var standardItemIds = _.map(project.standard_items, 'standard_item_id');
  //      findStandardItems = Curriculum.StandardItem.$$find({where: {_id: standardItemIds.join()}});
  //    }
  //
  //    if (project.rules
  //      && _.isArray(project.rules)
  //      && project.rules.length > 0) {
  //
  //      var ruleIds = _.map(project.rules, 'rule_id');
  //      findRules = Pbl.Rule.$$find({where: {_id: ruleIds.join()}});
  //    }
  //
  //    return Promise.join(findTechniques, findStandardItems, findRules, function (techniques, standard_items, rules) {
  //      if (techniques) {
  //        _.each(project.techniques, function(technique) {
  //          _.each(techniques, function(t) {
  //            if (technique.technique_id === t.id) {
  //              technique.technique = t;
  //            }
  //          });
  //        });
  //      }
  //      if (standard_items) {
  //        _.each(project.standard_items, function(standard_item) {
  //          _.each(standard_items, function(s){
  //            if (standard_item.standard_item_id === s.id) {
  //              standard_item.standard_item = s;
  //            }
  //          });
  //        });
  //      }
  //      if (rules) {
  //        _.each(project.rules, function(rule) {
  //          _.each(rules, function(r) {
  //            if (rule.rule_id === r.id) {
  //              rule.rule = r;
  //            }
  //          });
  //        });
  //      }
  //      return project;
  //    });
  //
  //  }));
  //}

};
