var Promise = require('bluebird'),
  humps = require('humps');

module.exports = function (sails) {

  var hook;

  return {
    initialize: function (cb) {
      hook = this;

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
      sails.after(eventsToWaitFor, hook.extend);

      cb();
    },

    extend: function () {

      var modelExpansion = {

        autoCreatedAt: false,
        autoUpdatedAt: false,

        $$find: function (options) {
          var def = Promise.defer();
          this.$find(options, null, def.callback);
          return def.promise;
        },

        $$findOne: function (options) {
          var def = Promise.defer();
          this.$findOne(options, null, def.callback);
          return def.promise;
        },

        $$create: function (values) {
          var def = Promise.defer();
          this.$create(null, values, def.callback);
          return def.promise;
        },

        $$update: function (options, values) {
          var def = Promise.defer();
          this.$update(options, values, def.callback);
          return def.promise;
        },

        $$destroy: function (options) {
          var def = Promise.defer();
          this.$destroy(options, null, def.callback);
          return def.promise;
        },

        proxyIndex: function (req, res) {
          return res.fill(this.$$find({where: req.query}));
        },

        proxyShow: function (req, res) {
          return res.fill(this.$$findOne({where: _.merge({_id: req.param('id')}, req.query)}));
        },

        proxyCreate: function (req, res) {
          return res.fill(this.$$create(req.body[this.getModelResource()]));
        },

        proxyUpdate: function (req, res) {
          return res.fill(this.$$update({where: {_id: req.param('id')}}, req.body[this.getModelResource()]));
        },

        proxyDestroy: function (req, res) {
          return res.fill(this.$$destroy({where: {_id: req.param('id')}}));
        },

        getModelResource: function () {
          var globalId = this.globalId;
          var array = globalId.split('.');
          if (array.length === 2) {
            return humps.decamelize(array[1]);
          } else {
            return humps.decamelize(array[0]);
          }
        }

      };

      _.each(sails.models, function eachModel(model) {
        // namespace hook
        var array = model.globalId.split('.');
        if (array.length === 2) {
          model.namespace = array[0].toLowerCase();
          model.resource = array[1].toLowerCase();

          global[array[0]] = global[array[0]] || {};
          global[array[0]][array[1]] = model;
        } else {
          model.resource = array[0].toLowerCase();
        }

        // 扩展model
        _.extend(model, modelExpansion);
      });

      var extendController = function (resource) {
        return {
          index: function (req, res) {
            sails.models[resource.toLowerCase()].proxyIndex(req, res);
          },

          show: function (req, res) {
            sails.models[resource.toLowerCase()].proxyShow(req, res);
          },

          create: function (req, res) {
            sails.models[resource.toLowerCase()].proxyCreate(req, res);
          },

          update: function (req, res) {
            sails.models[resource.toLowerCase()].proxyUpdate(req, res);
          },

          destroy: function (req, res) {
            sails.models[resource.toLowerCase()].proxyDestroy(req, res);
          }
        }
      };

      _.each(sails.controllers, function eachController(controller) {
        if (controller.resource) {
          // 扩展 controller
          _.defaults(controller, extendController(controller.resource));
        }
      });
    }
  }

};
