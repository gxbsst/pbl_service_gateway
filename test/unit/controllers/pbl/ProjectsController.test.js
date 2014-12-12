var request = require('supertest')
  , nock = require('nock');

describe('pbl/ProjectsController', function () {

  describe('#index()', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/projects')
        .reply(200, [{
          name: "Project",
          description: "PBL Project"
        }]);
      done();
    });

    it('should respond with array', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/projects')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, [{
          name: "Project",
          description: "PBL Project"
        }], done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

});
