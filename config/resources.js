/**
 * 类似rails的路由方案
 * action的路由方案来自 https://github.com/gocardless/http-api-design
 *
 * @type {{actions: boolean, rest: boolean, prefix: string}}
 */
module.exports.resources = {
  // Shadow-Routes Enabled
  //
  // e.g. 'POST /users/:id/actions/authenticate': 'UsersController.authenticate'
  actions: true,
  // e.g. 'GET /users': 'UsersController.index'
  // e.g. 'GET /users/:id': 'UsersController.show'
  // e.g. 'POST /users': 'UsersController.create'
  // ... rails like
  rest: true,

  // Shadow-Route Modifiers
  //
  // e.g. 'GET /api/v1/users/:id': 'UsersController.show'
  prefix: ''
}
