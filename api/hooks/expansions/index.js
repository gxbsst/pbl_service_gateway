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

      var extendController = function (resource, include) {
        return {
          index: function (req, res) {
            // sails.models[resource.toLowerCase()].proxyIndex(req, res);

            return res.fill(sails.models[resource.toLowerCase()].$$find({where: req.query}).then(function (result) {
              var def = Promise.defer();

              if (include && !_.isEmpty(result.data)) {
                var props = {};

                _.each(include.index, function (info) {
                  if (_.isString(req.query.include) && _.contains(req.query.include.split(','), info.param)) {
                    var viaIds = _.filter(_.pluck(result.data, info.via));
                    if (!_.isEmpty(viaIds)) {
                      props[info.via] = sails.models[info.model.toLowerCase()].$$find({where: {_id: viaIds.join()}});
                    }
                  }
                });

                Promise.props(props).then(function (includedResult) {
                  _.each(result.data, function (item) {
                    _.each(include.index, function (info) {
                      if (item[info.via] && includedResult[info.via] && includedResult[info.via].data) {
                        var el = _.find(includedResult[info.via].data, {id: item[info.via]});
                        if (el) {
                          delete item[info.via];
                          var embed = info.embed || info.via.substring(0, info.via.lastIndexOf('_id'));
                          item[embed] = el;
                        }
                      }
                    });
                  });
                }).finally(function () {
                  def.callback(null, result);
                });

              } else {
                def.callback(null, result);
              }

              return def.promise;

            }));
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
          _.defaults(controller, extendController(controller.resource, controller.include));
        }
      });
    }
  }

};
