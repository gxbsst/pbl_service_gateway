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

  index: function (req, res) {
    Pbl.Project.proxyIndex(req, res);
  },

  show: function (req, res) {
    Pbl.Project.proxyShow(req, res);
  },

  create: function (req, res) {
    Pbl.Project.proxyCreate(req, res);
  },

  update: function (req, res) {
    Pbl.Project.proxyUpdate(req, res);
  },

  destroy: function (req, res) {
    Pbl.Project.proxyDestroy(req, res);
  }

};
