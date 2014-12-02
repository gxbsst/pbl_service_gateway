var Promise = require('bluebird'),
  request = require('supertest'),
  muk = require('muk'),
  RestError = require('../../../api/errors/RestError');

describe('UsersController', function () {

  describe('#index()', function () {

    before(function (done) {
      muk(User, 'find', function () {
        var def = Promise.defer();
        process.nextTick(function () {
          def.callback(null, [{id: 1, username: 'admin', email: 'admin@example.com'}]);
        })
        return def.promise;
      })
      done();
    });

    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/users')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect([{id: 1, username: 'admin', email: 'admin@example.com'}], done);
    });

    after(function (done) {
      muk.restore();
      done();
    });

  });

  describe('#show()', function () {

    before(function (done) {
      muk(User, 'findOne', function () {
        var def = Promise.defer();
        process.nextTick(function () {
          def.callback(null, {id: 1, username: 'admin', email: 'admin@example.com'});
        });
        return def.promise;
      });
      done();
    });

    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/users/admin')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({id: 1, username: 'admin', email: 'admin@example.com'}, done);
    });

    after(function (done) {
      muk.restore();
      done();
    });
  });

  describe('#create()', function () {

    before(function (done) {
      muk(User, 'create', function (object) {
        var def = Promise.defer();
        object.id = 1;
        process.nextTick(function () {
          def.callback(null, object);
        });
        return def.promise;
      });
      done();
    });

    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .post('/users')
        .send({user: {username: 'admin', email: 'admin@example.com'}})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect({username: 'admin', email: 'admin@example.com', id: 1}, done);
    });

    after(function (done) {
      muk.restore();
      done();
    });
  });

  describe('#authenticate()', function () {

    describe('(error finding)', function () {
      before(function (done) {
        muk(User, 'findOne', function () {
          var def = Promise.defer();
          process.nextTick(function () {
            def.callback(new RestError(404, 'not found'), {});
          });
          return def.promise;
        });
        done();
      });

      it('should respond with 404', function (done) {
        request(sails.hooks.http.app)
          .post('/users/admin/actions/authenticate')
          .send({password: 'admin'})
          .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
          .expect('Content-Type', /json/)
          .expect(404, done);
      });

      after(function (done) {
        muk.restore();
        done();
      });
    });

    describe('(request success)', function () {
      before(function (done) {
        muk(User, 'findOne', function () {
          var def = Promise.defer();
          process.nextTick(function () {
            def.callback(null, {id: 1, username: 'admin', email: 'admin@example.com'});
          });
          return def.promise;
        });

        muk(RestClient, 'request', function (method, path, option, callback) {
          var def = Promise.defer();
          process.nextTick(function () {
            def.callback(null, {id: 1, username: 'admin', email: 'admin@example.com'});
          });
          return def.promise;
        });

        done();
      });

      it('by username & password, should respond with json', function (done) {
        request(sails.hooks.http.app)
          .post('/users/admin/actions/authenticate')
          .send({password: 'admin'})
          .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect({id: 1, username: 'admin', email: 'admin@example.com'}, done);
      });

      it('by email & password, should respond with json', function (done) {
        request(sails.hooks.http.app)
          .post('/users/admin@example.com/actions/authenticate')
          .send({password: 'admin'})
          .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect({id: 1, username: 'admin', email: 'admin@example.com'}, done);
      });

      after(function (done) {
        muk.restore();
        done();
      });
    })
  });

});
