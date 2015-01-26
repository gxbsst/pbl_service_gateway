module.exports = {

  resource: 'Skill.Technique',

  include: {
    index: [
      {
        param: 'sub_categories',
        model: 'Skill.SubCategory',
        via: 'sub_category_id'
      }
    ]
  }

};
