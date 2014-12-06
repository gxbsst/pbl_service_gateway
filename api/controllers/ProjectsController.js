/**
 *
 * 'project': {
    'id': Random.guid(),

    'project_name': Random.title(),
    'curriculum_standards': [{
        'id': Random.guid(),
        'label': Random.title()
    }],
    'skills': [{
        'id': Random.guid(),
        'label': Random.title()
    }],
    'driven_issue': Random.paragraph(),
    'standard_analysis': Random.paragraph(),
    'standard_decomposition': [],
    'final_product': {
        'id': Random.guid(),
        'form': {
            'id': Random.guid(),
            'title': Random.title()
        },
        'description': Random.title(),
        'example': Random.guid()
    },
    'stage_products':[{
        'id': Random.guid(),
        'form': {
            'id': Random.guid(),
            'title': Random.title()
        },
        'description': Random.title(),
        'example': [Random.guid()]
    }]
}
 */
module.exports = {

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
