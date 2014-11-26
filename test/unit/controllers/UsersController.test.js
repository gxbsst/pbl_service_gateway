var request = require('supertest');

describe('UsersController', function () {

  describe('#index()', function () {
    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/users')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  /*describe('#authenticate()', function () {
    it('by email & password, should respond with json', function (done) {
      request(sails.hooks.http.app)
        .post('/users/' + user.email + '/actions/authenticate')
        .send({password: user.password})
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });*/

});
