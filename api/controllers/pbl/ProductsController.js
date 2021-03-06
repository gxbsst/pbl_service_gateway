module.exports = {

  resource: 'Pbl.Product',

  include: {
    index: [
      {
        param: 'product_forms',
        model: 'ProductForm',
        via: 'product_form_id'
      },
      {
        param: 'resources',
        model: 'Resource',
        via: 'resource_id'
      }
    ]
  }

};
