/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

  /*example: {
    adapter: 'rest',
    type: 'json',                           // expected response type (json | string | http)
    hostname: 'localhost',                  // api hostname
    port: 80,                               // api port
    protocol: 'http',                       // HTTP protocol (http | https)
    accept: 'application/json',             // HTTP headers.accept
    rejectUnauthorized: true,               // prevent https connections that use a self-signed certificate
    maxSockets: 150,                        // http.globalAgent.maxSockets (NodeJS)
    requestTimeout: 95000,                  // request timeout (ms)
    pathname: '/api/v1',                    // base api path
    headers: {                              // http headers
      'x-foo': 'bar'
    },
    resource: null,                         // resource path to use (overrides model name)
    action: null,                           // action to use for the given resource ([resource]/run)
    query: {},                              // query parameters to provide with all GET requests
    methods: {                              // overrides default HTTP methods used for each CRUD action
      create: 'post',
      find: 'get',
      update: 'put',
      destroy: 'del'
    },
    cache: {
      engine: require('./cache')
    }
  },*/

  localhostServiceV1: {
    adapter: 'rest',
    type: 'json',
    hostname: 'localhost',
    port: 3000,
    protocol: 'http',
    accept: 'application/vnd.ibridgebrige.com; version=1',
    rejectUnauthorized: true,
    maxSockets: 150,
    requestTimeout: 95000,
    pathname: '',
    headers: {
      'Content-Type': 'application/json'
    },
    resource: null,
    action: null,
    query: {},
    methods: {
      create: 'post',
      find: 'get',
      update: 'patch',
      destroy: 'del'
    }
  },

  lan120ServiceV1: {
    adapter: 'rest',
    type: 'json',
    hostname: '172.172.172.120',
    port: 3000,
    protocol: 'http',
    accept: 'application/vnd.ibridgebrige.com; version=1',
    rejectUnauthorized: true,
    maxSockets: 150,
    requestTimeout: 95000,
    pathname: '',
    headers: {
      'Content-Type': 'application/json'
    },
    resource: null,
    action: null,
    query: {},
    methods: {
      create: 'post',
      find: 'get',
      update: 'patch',
      destroy: 'del'
    }
  }
};
