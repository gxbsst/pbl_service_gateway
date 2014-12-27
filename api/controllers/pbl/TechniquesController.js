var Promise = require("bluebird");

module.exports = {

  resource: 'Pbl.Technique',

  include: {
    index: [
      {
        param: 'techniques',
        model: 'Skill.Technique',
        via: 'technique_id',
        include: "parents"
      }
    ]
  }

};
