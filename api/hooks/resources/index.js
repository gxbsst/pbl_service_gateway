var _ = require('lodash')
  , util = require('util')
  , humps = require('humps');

/**
 * Resources (User Hook)
 *
 * Stability: 1 - Experimental
 * (see http://nodejs.org/api/documentation.html#documentation_stability_index)
 */
module.exports = function (sails) {

  var hook;

  return {

    /**
     * Default configuration to merge w/ top-level `sails.config`
     * @type {Object}
     */
    defaults: {
      resources: {
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
    },

    /**
     * Initialize is fired first thing when the hook is loaded.
     *
     * @param  {Function} cb
     */
    initialize: function (cb) {
      // Provide hook context to closures
      hook = this;

      // Set up listener to bind shadow routes when the time is right.
      //
      // Always wait until after router has bound static routes.
      // If policies hook is enabled, also wait until policies are bound.
      // If orm hook is enabled, also wait until models are known.
      // If controllers hook is enabled, also wait until controllers are known.
      var eventsToWaitFor = [];
      eventsToWaitFor.push('router:after');
      if (sails.hooks.policies) {
        eventsToWaitFor.push('hook:policies:bound');
      }
      if (sails.hooks.orm) {
        eventsToWaitFor.push('hook:orm:loaded');
      }
      if (sails.hooks.controllers) {
        eventsToWaitFor.push('hook:controllers:loaded');
      }
      sails.after(eventsToWaitFor, hook.bindShadowRoutes);

      cb();
    },

    bindShadowRoutes: function () {

      _.each(sails.middleware.controllers, function eachController(controller, controllerId) {
        if (!_.isObject(controller) || _.isArray(controller)) return;

        // Get globalId for use in errors/warnings
        var globalId = sails.controllers[controllerId].globalId;

        // Determine resource configuration for this controller
        var config = _.merge({},
          sails.config.resources,
          controller._config || {});

        // Validate resource config for this controller
        if (config.prefix) {
          if (!_(config.prefix).isString()) {
            sails.after('lifted', function () {
              sails.log.blank();
              sails.log.warn(util.format('Ignoring invalid resource prefix configured for controller `%s`.', globalId));
              sails.log.warn('`prefix` should be a string, e.g. "/api/v1".');
              STRINGFILE.logMoreInfoLink(STRINGFILE.get('links.docs.config.resources'), sails.log.warn);
            });
            return;
          }
          if (!config.prefix.match(/^\//)) {
            var originalPrefix = config.prefix;
            sails.after('lifted', function () {
              sails.log.blank();
              sails.log.warn(util.format('Invalid resource prefix ("%s") configured for controller `%s` (should start with a `/`).', originalPrefix, globalId));
              sails.log.warn(util.format('For now, assuming you meant:  "%s".', config.prefix));
              STRINGFILE.logMoreInfoLink(STRINGFILE.get('links.docs.config.resources'), sails.log.warn);
            });

            config.prefix = '/' + config.prefix;
          }
        }

        // Determine the names of the controller's user-defined actions
        // IMPORTANT: Use `sails.controllers` instead of `sails.middleware.controllers`
        // (since `sails.middleware.controllers` will have resources already mixed-in,
        // and we want the explicit actions defined in the app)
        var actions = Object.keys(sails.controllers[controllerId]);

        // Determine base route
        var baseRoute = config.prefix + '/' + humps.decamelize(globalId);

        // Build route options for resource
        var routeOpts = config;

        // Bind "actions" and "index" shadow routes for each action
        _.each(actions, function eachActionID(actionId) {

          var opts = _.merge({
            action: actionId,
            controller: controllerId
          }, routeOpts);

          // Bind a route based on the action name, if `actions` shadows enabled
          if (config.actions && !actionId.match(/^index$|^create$|^show$|^update$|^fresh$|^edit$|^destroy$/i)) {
            var actionRoute = 'POST ' + baseRoute + '/:id/actions/' + actionId.toLowerCase();
            sails.log.silly('Binding action (' + actionId.toLowerCase() + ') resource/shadow route for controller:', controllerId);
            sails.router.bind(actionRoute, controller[actionId.toLowerCase()], null, opts);
          }
        });

        // Given an action id like "find" or "create", returns the appropriate
        // resource action (or explicit controller action if the controller
        // overrode the resource CRUD action.)
        var _getAction = _.partial(_getMiddlewareForShadowRoute, controllerId);

        // Returns a customized version of the route template as a string.
        var _getRoute = _.partialRight(util.format, baseRoute);

        // Binds a route to the specifed action using _getAction, and sets the action and controller
        // options for req.options
        var _bindRoute = function (path, action, options) {
          options = options || routeOpts;
          options = _.extend({}, options, {action: action, controller: controllerId});
          sails.router.bind(path, _getAction(action), null, options);
        };

        // Bind "rest" resource/shadow routes
        if (config.rest) {
          sails.log.silly('Binding RESTful resource/shadow routes for controller:', controllerId);

          _bindRoute(_getRoute('GET %s'), 'index');
          _bindRoute(_getRoute('POST %s'), 'create');
          _bindRoute(_getRoute('GET %s/new'), 'fresh');
          _bindRoute(_getRoute('GET %s/:id/edit'), 'edit');
          _bindRoute(_getRoute('GET %s/:id'), 'show');
          _bindRoute(_getRoute('PATCH %s/:id'), 'update');
          _bindRoute(_getRoute('PUT %s/:id'), 'update');
          _bindRoute(_getRoute('DELETE %s/:id'), 'destroy');
        }
      });


      /**
       * Return the middleware function that should be bound for a shadow route
       * pointing to the specified actionId. Will use the explicit controller
       * action if it exists, otherwise the resource action.
       *
       * @param  {String} controllerId
       * @param  {String} actionId  [find, create, etc.]
       * @return {Function}            [middleware]
       */
      function _getMiddlewareForShadowRoute(controllerId, actionId) {

        // Allow custom actions defined in controller to override resource actions.
        return sails.controllers[controllerId][actionId.toLowerCase()];
      }
    }
  }
}
