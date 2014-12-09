/**
 *
 'data': {
    'id': '@GUID',
    'project_name': '@TITLE',
    'curriculum_standards|1-5':[{
      'id': '@GUID',
      'title': '@TITLE'
    }],
    'skills|1-5':[{
      'id': '@GUID',
      'title': '@TITLE'
    }],
    'driven_issue': '@PARAGRAPH',
    'standard_analysis':'@PARAGRAPH',
    'standard_decompositions|1-5':[{
      'id':'@GUID',
      'verb':'@TITLE',
      'noun':'@TITLE',
      'role':'@TITLE',
      'products':'@TITLE',
      'skill':'@TITLE'
    }],
    'final_product':{
      'form':{
        'id':'@GUID',
        'title': '@TITLE'
      },
      'description': '@PARAGRAPH',
      'example': '@GUID'
    },
    'stage_products|1-10':[{
      'id':'@GUID',
      'form':{
        'id':'@GUID',
        'title': '@TITLE'
      },
      'description': '@PARAGRAPH',
      'example': ['@GUID']
    }]
 }
 */
module.exports = {

  namespace: 'pbl',

  index: function(req, res) {
    return res.fill(Project.find());
  },

  create: function (req, res) {
    return res.fill(Project.create());
  },

  update: function (req, res) {
    return res.fill(Project.findOne(req.param('id')).then(function (project) {
      _.extend(project, req.body.project);
      return project.save();
    }));
  }

};
