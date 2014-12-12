var request = require('supertest')
  , nock = require('nock');

describe('skill/CategoriesController', function () {

  describe('#index()', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get("/skill/categories")
        .reply(200, [
          {
            name: "category",
            position: 1
          }
        ]);
      done();
    });

    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/skill/categories')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect([
          {
            name: "category",
            position: 1
          }
        ], done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

});
