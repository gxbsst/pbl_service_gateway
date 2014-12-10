var Promise = require('bluebird')
  , request = require('supertest')
  , muk = require('muk');

describe('curriculum/SubjectsController', function () {

  describe('#index()', function () {

    before(function (done) {
      muk(Curriculum.Subject, 'find', function () {
        var def = Promise.defer();
        process.nextTick(function () {
          def.callback(null, [{
            id: '971ecce9-b4cb-4e6e-6c17-6b9534983396',
            name: 'subject',
            position: 1
          }]);
        });
        return def.promise;
      });
      done();
    });

    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/curriculum/subjects')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect([{
          id: '971ecce9-b4cb-4e6e-6c17-6b9534983396',
          name: 'subject',
          position: 1
        }], done);
    });

    after(function (done) {
      muk.restore();
      done();
    });

  });

  describe('#show()', function () {

    before(function (done) {
      muk(Curriculum.Subject, 'findOne', function () {
        var def = Promise.defer();
        process.nextTick(function () {
          def.callback(null, {
            id: '971ecce9-b4cb-4e6e-6c17-6b9534983396',
            name: 'subject',
            position: 1,
            phases: [
              {
                title: 'phase1'
              },
              {
                title: 'phase2'
              }
            ]
          });
        });
        return def.promise;
      });
      done();
    });

    it('should respond with json', function (done) {
      request(sails.hooks.http.app)
        .get('/curriculum/subjects/971ecce9-b4cb-4e6e-6c17-6b9534983396?include=phases')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({
          id: '971ecce9-b4cb-4e6e-6c17-6b9534983396',
          name: 'subject',
          position: 1,
          phases: [
            {
              title: 'phase1'
            },
            {
              title: 'phase2'
            }
          ]
        }, done);
    });

    after(function (done) {
      muk.restore();
      done();
    });

  });

});
