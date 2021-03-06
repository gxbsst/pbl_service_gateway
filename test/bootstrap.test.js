var Sails = require('sails');

before(function (done) {
  Sails.lift({
    // configuration for testing purposes

    // sails config
    "hooks": {
      "blueprints": false,
      "cors": false,
      "csrf": false,
      "pubsub": false,
      "session": false,
      "sockets": false,
      "views": false
    },
    "generators": {
      "modules": {}
    },

    // app config
    models: {
      connection: 'localhostServiceV1'
    },

    port: 5001

  }, function (err, sails) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function (done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
