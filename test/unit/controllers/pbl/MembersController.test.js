var request = require('supertest')
  , nock = require('nock');

describe('group/MembersController', function () {

  describe('#join()', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .post('/groups/members/actions/join')
        .reply(200);
      done();
    });

    it('should respond 200', function (done) {
      request(sails.hooks.http.app)
        .post('/groups/members/actions/join')
        .send({
          member: {user_id: 'user_id', group_id: 'group_id', role: ['creator']}
        })
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

});
