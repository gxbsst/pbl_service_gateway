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

        $$action: function (options, values) {
          var def = Promise.defer();
          this.$action(options, values, def.callback);
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

      var extendController = function (resource, include, join) {
        return {
          index: function (req, res) {
            // sails.models[resource.toLowerCase()].proxyIndex(req, res);
            return res.fill(sails.models[resource.toLowerCase()].$$find({where: req.query}).then(function (result) {
              var def = Promise.defer();

              if (!_.isEmpty(result.data)) {
                var props = {};
                if(include && include.index){
                  _.each(include.index, function (info) {
                    if (_.isString(req.query.include) && _.contains(req.query.include.split(','), info.param)) {
                      var viaIds = [];
                      _.each(result.data, function (item) {
                        var vid = item[info.via];
                        if (vid && !_.contains(viaIds, vid)) {
                          viaIds.push(vid);
                        }
                      });
                      if (!_.isEmpty(viaIds)) {
                        if (info.include) {
                          props[info.via] = sails.models[info.model.toLowerCase()].$$find({
                            where: {
                              _id: viaIds.join(),
                              include: info.include
                            }
                          });
                        } else {
                          props[info.via] = sails.models[info.model.toLowerCase()].$$find({where: {_id: viaIds.join()}});
                        }
                      }
                    }
                  });
                }

                if(join){
                  _.each(join, function (info) {
                    var ids = [];
                    _.each(result.data, function (item) {
                      ids.push(item.id);
                    });
                    if (!_.isEmpty(ids)) {
                      props[info.model] = sails.models[info.model.toLowerCase()].$$find({where: {owner_ids: ids.join()}});
                    }
                  });
                }

                Promise.props(props).then(function (includedResult) {
                  _.each(result.data, function (item) {
                    if(include && include.index){
                      _.each(include.index, function (info) {
                        var embed = info.embed || info.via.substring(0, info.via.lastIndexOf('_id'));
                        if (item[info.via] && includedResult[info.via]) {
                          if (includedResult[info.via].data) {
                            var el = _.find(includedResult[info.via].data, {id: item[info.via]});
                            if (el && el.id) {
                              delete item[info.via];
                              item[embed] = el;
                            }
                          } else if (_.isObject(includedResult[info.via])) {
                            delete item[info.via];
                            item[embed] = includedResult[info.via];
                          }
                        }
                      });
                    }
                    if(join){
                      _.each(join, function (info) {
                        var embed = info.embed || info.model.toLowerCase();
                        if (includedResult[info.model].data) {
                          var el = _.find(includedResult[info.model].data, {owner_id: item.id});
                          if (el && el[info.attribute]) {
                            item[embed] = el[info.attribute];
                          }
                        } else if (_.isObject(includedResult[info.model])) {
                          item[embed] = includedResult[info.model][info.attribute];
                        }
                      });
                    }
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
            //sails.models[resource.toLowerCase()].proxyShow(req, res);
            var _include = req.query.include;
            delete req.query.include;
            return res.fill(sails.models[resource.toLowerCase()].$$findOne({where: _.merge({_id: req.param('id')}, req.query)}).then(function (result) {
              var def = Promise.defer(),
                props = {};
              if(!_.isEmpty(result)){
                if(include && include.show){
                  _.each(include.show, function (info) {
                    if (_.isString(_include) && _.contains(_include.split(','), info.param)) {
                      var viaId = result[info.via];
                      if (viaId) {
                        if (info.include) {
                          props[info.via] = sails.models[info.model.toLowerCase()].$$find({
                            where: {
                              _id: viaId,
                              include: info.include
                            }
                          });
                        } else {
                          props[info.via] = sails.models[info.model.toLowerCase()].$$find({where: {_id: viaId}});
                        }
                      }
                    }
                  });
                }
                if(join){
                  _.each(join, function (info) {
                    props[info.model] = sails.models[info.model.toLowerCase()].$$find({where: {owner_type: info.type, owner_id: result.id}});
                  });
                }

                Promise.props(props).then(function (includedResult) {
                  if(include && include.show){
                    _.each(include.show, function (info) {
                      var embed = info.embed || info.via.substring(0, info.via.lastIndexOf('_id'));
                      if (result[info.via] && includedResult[info.via]) {
                        if (includedResult[info.via].data) {
                          var el = _.find(includedResult[info.via].data, {id: result[info.via]});
                          if (el && el.id) {
                            delete result[info.via];
                            result[embed] = el;
                          }
                        } else if (_.isObject(includedResult[info.via])) {
                          delete result[info.via];
                          result[embed] = includedResult[info.via];
                        }
                      }
                    });
                  }
                  if(join){
                    _.each(join, function (info) {
                      var embed = info.embed || info.model.toLowerCase(),
                        data = includedResult[info.model].data;
                      if(data[0]){
                        result[embed] = info.attribute ? data[0][info.attribute] : data[0];
                      }
                    });
                  }
                }).finally(function () {
                  def.callback(null, result);
                });
              }else{
                def.callback(null, result);
              }
              return def.promise;
            }));
          },

          create: function (req, res) {
            //sails.models[resource.toLowerCase()].proxyCreate(req, res);
            var _include = req.query.include;
            delete req.query.include;
            return res.fill(sails.models[resource.toLowerCase()].$$create(req.body[sails.models[resource.toLowerCase()].getModelResource()]).then(function (result) {
              var def = Promise.defer();
              if (include && include.show && !_.isEmpty(result)) {

                var props = {};
                _.each(include.show, function (info) {
                  if (_.isString(_include) && _.contains(_include.split(','), info.param)) {
                    var viaId = result[info.via];
                    if (viaId) {
                      if (info.include) {
                        props[info.via] = sails.models[info.model.toLowerCase()].$$find({
                          where: {
                            _id: viaId,
                            include: info.include
                          }
                        });
                      } else {
                        props[info.via] = sails.models[info.model.toLowerCase()].$$find({where: {_id: viaId}});
                      }
                    }
                  }
                });

                Promise.props(props).then(function (includedResult) {
                  _.each(include.show, function (info) {
                    if (result[info.via] && includedResult[info.via]) {
                      if (includedResult[info.via].data) {
                        var el = _.find(includedResult[info.via].data, {id: result[info.via]});
                        if (el && el.id) {
                          delete result[info.via];
                          var embed = info.embed || info.via.substring(0, info.via.lastIndexOf('_id'));
                          result[embed] = el;
                        }
                      } else if (_.isObject(includedResult[info.via])) {
                        delete result[info.via];
                        var embed = info.embed || info.via.substring(0, info.via.lastIndexOf('_id'));
                        result[embed] = includedResult[info.via];
                      }
                    }
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

          update: function (req, res) {
            //sails.models[resource.toLowerCase()].proxyUpdate(req, res);
            var _include = req.query.include;
            delete req.query.include;
            return res.fill(sails.models[resource.toLowerCase()].$$update({where: {_id: req.param('id')}}, req.body[sails.models[resource.toLowerCase()].getModelResource()]).then(function (result) {
              var def = Promise.defer();
              if (include && include.show && !_.isEmpty(result)) {

                var props = {};
                _.each(include.show, function (info) {
                  if (_.isString(_include) && _.contains(_include.split(','), info.param)) {
                    var viaId = result[info.via];
                    if (viaId) {
                      if (info.include) {
                        props[info.via] = sails.models[info.model.toLowerCase()].$$find({
                          where: {
                            _id: viaId,
                            include: info.include
                          }
                        });
                      } else {
                        props[info.via] = sails.models[info.model.toLowerCase()].$$find({where: {_id: viaId}});
                      }
                    }
                  }
                });

                Promise.props(props).then(function (includedResult) {
                  _.each(include.show, function (info) {
                    if (result[info.via] && includedResult[info.via]) {
                      if (includedResult[info.via].data) {
                        var el = _.find(includedResult[info.via].data, {id: result[info.via]});
                        if (el && el.id) {
                          delete result[info.via];
                          var embed = info.embed || info.via.substring(0, info.via.lastIndexOf('_id'));
                          result[embed] = el;
                        }
                      } else if (_.isObject(includedResult[info.via])) {
                        delete result[info.via];
                        var embed = info.embed || info.via.substring(0, info.via.lastIndexOf('_id'));
                        result[embed] = includedResult[info.via];
                      }
                    }
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

          destroy: function (req, res) {
            sails.models[resource.toLowerCase()].proxyDestroy(req, res);
          }
        }
      };

      _.each(sails.controllers, function eachController(controller) {
        if (controller.resource) {
          // 扩展 controller
          _.defaults(controller, extendController(controller.resource, controller.include, controller.join));
        }
      });
    }
  }

};
