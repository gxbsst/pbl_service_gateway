var request = require('supertest');

describe('UsersController', function () {

  var user = {
    username: 'john_doe',
    email: 'john_doe@test.com',
    password: 'secret',
    first_name: 'John',
    last_name: 'Doe'
  }

  describe('#index()', function () {
    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/users')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('#create()', function () {
    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .post('/users')
        .send(user)
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('#authenticate()', function () {
    it('by username & password, should respond with json', function (done) {
      request(sails.hooks.http.app)
        .post('/users/' + user.username + '/actions/authenticate')
        .send({password: user.password})
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('by email & password, should respond with json', function (done) {
      request(sails.hooks.http.app)
        .post('/users/' + user.email + '/actions/authenticate')
        .send({password: user.password})
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

});
