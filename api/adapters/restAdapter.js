/*---------------------------------------------------------------
 :: sails-rest
 -> adapter
 ---------------------------------------------------------------*/

var Errors = require('waterline-errors').adapter,
  async = require('async'),
  restify = require('restify'),
  url = require('url'),
  _ = require('lodash'),
  _i = require('underscore.inflections'),
  _s = require('underscore.string'),
  RestError = require('../errors/RestError'),
  pluralize = require('pluralize'),
  humps = require('humps');

module.exports = (function () {
  "use strict";

  var connections = {};

  // Private functions
  /**
   * Format result object according to schema
   * @param {Object} result
   * @param {String} collectionName - collection the result object belongs to
   * @param {Object} config - connection configuration
   * @param {Object} definition - collection definition
   * @returns {Object}
   */
  function formatResult(result, collectionName, config, definition) {
    if (_.isFunction(config.beforeFormatResult)) {
      result = config.beforeFormatResult(result);
    }

    _.each(definition, function (def, key) {
      if (def.type.match(/date/i)) {
        result[key] = new Date(result[key] ? result[key] : null);
      }
    });

    if (_.isFunction(config.afterFormatResult)) {
      result = config.afterFormatResult(result);
    }

    return result;
  }

  /**
   * Format results according to schema
   * @param {Array} results - objects (model instances)
   * @param {String} collectionName - collection the result object belongs to
   * @param {Object} config - connection configuration
   * @param {Object} definition - collection definition
   * @returns {Array}
   */
  function formatResults(results, collectionName, config, definition) {
    if (_.isFunction(config.beforeFormatResults)) {
      results = config.beforeFormatResults(results);
    }

    results.forEach(function (result) {
      formatResult(result, collectionName, config, definition);
    });

    if (_.isFunction(config.afterFormatResults)) {
      results = config.afterFormatResults(results);
    }

    return results;
  }

  /**
   * Ensure results are contained in an array. Resolves variants in API responses such as `results` or `objects` instead of `[.....]`
   * @param {Object|Array} data - response data to format as results array
   * @param {String} collectionName - collection the result object belongs to
   * @param {Object} config - connection configuration
   * @param {Object} definition - collection definition
   * @returns {Object|Array}
   */
  function getResultsAsCollection(data, collectionName, config, definition) {
    var d = (data.objects || data.results || data),
      a = _.isArray(d) ? d : [d];

    return formatResults(a, collectionName, config, definition);
  }

  /**
   * Generate a pathname to use for a request
   * @param {Object} config - connection configuration
   * @param {String} method - request method
   * @param {Object} values - data being send (if any)
   * @param {Object} options - options passed from the calling method
   * @returns {Object}
   */
  function getPathname(config, method, values, options) {
    var ns = '';
    if (config.namespace) {
      ns += config.namespace + '/';
    }
    var resource = config.resource;
    if (config.pluralize) {
      resource = _i.pluralize(config.resource);
    }
    return config.pathname + '/' + ns + resource;
  }

  /**
   * 根据resource和values来构建请求数据体
   *
   * @param values
   * @returns {{}}
   */
  function pack(config, values) {
    if (values && !_.isEmpty(values)) {
      var body = {};
      body[config.resource] = values;
      return body;
    }
    return values;
  }

  /**
   * Makes a REST request via restify
   * @param {String} identity - type of connection interface
   * @param {String} collectionName - collection the result object belongs to
   * @param {String} methodName - name of CRUD method being used
   * @param {Function} callback - callback from method
   * @param {Object} options - options from method
   * @param {Object|Array} [values] - values from method
   * @returns {*}
   */
  function makeRequest(identity, collectionName, methodName, callback, options, values) {
    var r = null,
      opt = null,
      cache = connections[identity].cache,
      config = _.cloneDeep(connections[identity].config),
      connection = connections[identity].connection,
      definition = connections[identity].definition,
      restMethod = config.methods[methodName],
      pathname;

    // Validate passed HTTP method
    if (!_.isFunction(connection[restMethod])) {
      callback(new Error('Invalid REST method: ' + restMethod));
      return;
    }

    // Override config settings from options if available
    if (options && _.isPlainObject(options)) {
      _.each(config, function (val, key) {
        if (_.has(options, key)) {
          config[key] = options[key];
        }
      });
    }

    // if resource name not set in config,
    // try to get it from pluralized form of collectionName
    if (!config.resource) {
      var globalId = sails.models[collectionName].globalId;
      var array = globalId.split('.');
      if (array.length === 2) {
        config.namespace = array[0].toLowerCase();
        config.resource = humps.decamelize(array[1]);
      } else {
        config.resource = humps.decamelize(array[0]);
      }
    }
    config.namespace = config.namespace || '';

    config.pluralize = sails.models[collectionName].pluralize;
    if (!_.isBoolean(config.pluralize)) {
      config.pluralize = true;
    }

    values = pack(config, values);

    pathname = config.getPathname(config, restMethod, values, options);

    if (options && options.where) {
      if (options.where._id) {
        // Add id to pathname if provided
        pathname += '/' + options.where._id;
        delete options.where._id;
      } else if (methodName === 'destroy' || methodName === 'update') {
        // Find all and make new request for each.
        makeRequest(identity, collectionName, 'find', function (err, results) {
          if (err) return callback(err);

          _.each(results, function (result, i) {
            var cb = ((i + 1) === results.length) ? callback : _.noop,
              options = {
                where: {
                  id: result.id
                }
              };

            makeRequest(identity, collectionName, methodName, cb, options, values);
          });
        }, options);

        return;
      }

      // Add where statement as query parameters if requesting via GET
      if (restMethod === 'get') {
        _.extend(config.query, (options.where || {}));
        ['skip', 'limit', 'offset'].forEach(function (key) {
          if (options[key] !== undefined) {
            config.query[key] = options[key];
          }
        });
      }
      // Set opt if additional where statements are available
      else if (_.size(options.where)) {
        opt = options.where;
      } else {
        delete options.where;
      }
    }

    // action path
    if (options && options.action) {
      pathname += '/actions/' + options.action;
      delete options.action;
    }

    if (options && options.handler) {
      pathname += '/' + options.handler;
      delete options.handler;
    }

    if (!opt && values) {
      opt = values;

      if (options) {
        opt = _.extend(options, opt);
      }
    }

    // Add pathname to connection
    config.pathname = pathname;

    // Format URI
    var uri = url.format(config);

    var cb = function (err, req, res, data) {
      var restError = RestError.handleError(err, req, res, data);
      r = formatResult(data, collectionName, config, definition);
      if (!restError && methodName === 'find' && cache){
        cache.engine.set(uri, JSON.stringify(r));
      }
      callback(null, r);
    };

    var callRequest = function () {
      if (_.isFunction(connection[restMethod])) {
        var path = uri.replace(connection.url.href, '/');

        // Make request via restify
        if (opt && !_.isEmpty(opt)) {
          connection[restMethod](path, opt, cb);
        } else {
          connection[restMethod](path, cb);
        }
      }
    };

    // Retrieve data from the cache
    if (methodName === 'find') {
      if (cache) {
        cache.engine.get(uri, function (err, val) {
          if (err || !val) {
            callRequest();
            return;
          }
          callback(null, JSON.parse(val));
          return;
        });
      }
    }

    callRequest();
  }

  // Adapter
  var adapter = {

    syncable: false,

    defaults: {
      type: 'json',
      protocol: 'http',
      hostname: 'localhost',
      port: 80,
      rejectUnauthorized: true,
      pathname: '',
      resource: null,
      action: null,
      query: {},
      methods: {
        create: 'post',
        find: 'get',
        update: 'put',
        destroy: 'del'
      },
      getPathname: getPathname,
      beforeFormatResult: null,
      afterFormatResult: null,
      beforeFormatResults: null,
      afterFormatResults: null
    },

    registerConnection: function (connection, collections, cb) {
      if (!connection.identity) return cb(Errors.IdentityMissing);
      if (connections[connection.identity]) return cb(Errors.IdentityDuplicate);

      var config, clientMethod, instance;

      config = this.defaults ? _.extend({}, this.defaults, connection) : connection;
      config.methods = this.defaults ? _.extend({}, this.defaults.methods, connection.methods) : connection.methods;
      clientMethod = _s.join('', 'create', _s.capitalize(config.type), 'Client');

      if (!_.isFunction(restify[clientMethod])) {
        throw new Error('Invalid type provided: ' + config.type);
      }

      if (config.maxSockets) {
        require('http').globalAgent.maxSockets = 150;
      }

      instance = {
        config: config,
        connection: restify[clientMethod]({
          url: url.format({
            protocol: config.protocol,
            hostname: config.hostname,
            host: config.host,
            port: config.port
          }),
          accept: config.accept,
          headers: config.headers,
          rejectUnauthorized: config.rejectUnauthorized,
          requestTimeout: config.requestTimeout
        })
      };

      // override method to rewrite 'accept'
      var connectionSuper = instance.connection._super;
      instance.connection.request = function(opts, cb) {
        opts.headers.accept = config.accept;
        connectionSuper.request(opts, cb);
      };

      if (config.basicAuth) {
        instance.connection.basicAuth(config.basicAuth.username, config.basicAuth.password);
      }

      if (config.cache) {
        instance.cache = config.cache;
      }

      connections[connection.identity] = instance;

      cb();
    },

    connections: connections,

    create: function (connection, collectionName, values, cb) {
      makeRequest(connection, collectionName, 'create', cb, null, values);
    },

    findOne: function (connection, collectionName, options, cb) {
      makeRequest(connection, collectionName, 'find', cb, options);
    },

    find: function (connection, collectionName, options, cb) {
      makeRequest(connection, collectionName, 'find', cb, options);
    },

    update: function (connection, collectionName, options, values, cb) {
      makeRequest(connection, collectionName, 'update', cb, options, values);
    },

    destroy: function (connection, collectionName, options, cb) {
      makeRequest(connection, collectionName, 'destroy', cb, options);
    },

    $find: function (connection, collectionName, options, values, cb) {
      makeRequest(connection, collectionName, 'find', cb, options);
    },

    $findOne: function (connection, collectionName, options, values, cb) {
      makeRequest(connection, collectionName, 'find', cb, options);
    },

    $create: function (connection, collectionName, options, values, cb) {
      makeRequest(connection, collectionName, 'create', cb, null, values);
    },

    $update: function (connection, collectionName, options, values, cb) {
      makeRequest(connection, collectionName, 'update', cb, options, values);
    },

    $destroy: function (connection, collectionName, options, values, cb) {
      makeRequest(connection, collectionName, 'destroy', cb, options);
    },

    $action: function (connection, collectionName, options, values, cb) {
      var method = options.method;
      if (method) {
        delete options.method;
      }
      makeRequest(connection, collectionName, method || 'update', cb, options, values);
    },

    drop: function (connection, collectionName, relations, cb) {
      cb();
    },

    define: function (connection, collectionName, definition, cb) {
      connections[connection].definition = definition;
      cb();
    },

    describe: function (connection, collectionName, cb) {
      cb(null, connections[connection].definition);
    }

  };

  return adapter;
}());
