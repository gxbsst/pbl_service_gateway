var Promise = require('bluebird')
  , request = require('supertest')
  , muk = require('muk');

describe('UsersController', function () {

  describe('#create()', function () {

    before(function (done) {
      muk(Project, 'create', function () {
        var def = Promise.defer();
        process.nextTick(function () {
          def.callback(null, {id: '971ecce9-b4cb-4e6e-6c17-6b9534983396'});
        })
        return def.promise;
      })
      done();
    });

    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .post('/projects')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({id: '971ecce9-b4cb-4e6e-6c17-6b9534983396'}, done);
    });

    after(function (done) {
      muk.restore();
      done();
    });

  });

  describe('#update()', function () {

    before(function (done) {
      var project = {
        id: '971ecce9-b4cb-4e6e-6c17-6b9534983396',
        project_name: 'New PBL Project'
      };

      muk(Project, 'findOne', function () {
        var def = Promise.defer();
        process.nextTick(function () {
          def.callback(null, project);
        });
        return def.promise;
      });

      muk(project, 'save', function () {
        var def = Promise.defer();
        process.nextTick(function () {
          def.callback(null, project);
        });
        return def.promise;
      });

      done();
    });

    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .put('/projects/971ecce9-b4cb-4e6e-6c17-6b9534983396')
        .send({
          project: {
            id: '971ecce9-b4cb-4e6e-6c17-6b9534983396',
            project_name: 'PBL Project'
          }
        })
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({
          id: '971ecce9-b4cb-4e6e-6c17-6b9534983396',
          project_name: 'PBL Project'
        }, done);
    });

    after(function (done) {
      muk.restore();
      done();
    });

  });

});
