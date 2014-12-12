var request = require('supertest')
  , nock = require('nock');

describe('pbl/ProjectsController', function () {

  describe('#create()', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .post("/pbl/projects")
        .reply(200, {
          name: "Project",
          description: "PBL Project",
          driven_issue: "驱动性问题"
        });
      done();
    });

    it('should respond with 200', function (done) {
      request(sails.hooks.http.app)
        .post('/pbl/projects')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          name: "Project",
          description: "PBL Project",
          driven_issue: "驱动性问题"
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

  describe('#update()', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .put("/pbl/projects/971ecce9-b4cb-4e6e-6c17-6b9534983396")
        .reply(200, {
          name: "PBL Project",
          description: "PBL Project",
          driven_issue: "驱动性问题"
        });
      done();
    });

    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .put('/pbl/projects/971ecce9-b4cb-4e6e-6c17-6b9534983396')
        .send({
          project: {
            name: 'PBL Project'
          }
        })
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({
          name: "PBL Project",
          description: "PBL Project",
          driven_issue: "驱动性问题"
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

});
