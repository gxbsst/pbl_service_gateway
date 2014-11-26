var Promise = require("bluebird"),
  request = require('supertest');

describe('UsersController', function () {

  describe('#index()', function () {

    before(function (done) {
      User.find = function () {
        var def = Promise.defer();
        def.callback(null, [{id: 1, username: 'admin', email: 'admin@example.com'}]);
        return def.promise;
      };
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
  });

  describe('#show()', function () {

    before(function (done) {
      User.findOne = function () {
        var def = Promise.defer();
        def.callback(null, {id: 1, username: 'admin', email: 'admin@example.com'});
        return def.promise;
      };
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
  });

  describe('#create()', function () {

    before(function (done) {
      User.create = function (object) {
        var def = Promise.defer();
        object.id = 1;
        def.callback(null, object);
        return def.promise;
      };
      done();
    });

    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .post('/users')
        .send({user: {username: 'admin', email: 'admin@example.com'}})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({id: 1, username: 'admin', email: 'admin@example.com'}, done);
    });
  });

  describe('#authenticate()', function () {

    before(function (done) {

      User.findOne = function (object) {
        var def = Promise.defer();
        def.callback(null, {id: 1, username: 'admin', email: 'admin@example.com'});
        return def.promise;
      }

      RestClient.request = function (method, path, option, callback) {
        var def = Promise.defer();
        def.callback(null, {id: 1, username: 'admin', email: 'admin@example.com'});
        return def.promise;
      }

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
  });

});
