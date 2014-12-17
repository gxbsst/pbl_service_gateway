var request = require('supertest')
  , nock = require('nock');

describe('pbl/StandardItemsController', function () {

  describe('#index()', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/standard_items')
        .reply(200, [{
          name: "item"
        }]);
      done();
    });

    it('should respond with array', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/standard_items')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, [{
          name: "item"
        }], done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

});
