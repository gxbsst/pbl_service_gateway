var request = require('supertest')
  , nock = require('nock');

describe('pbl/StandardItemsController', function () {

  describe('#index()', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/standard_items')
        .reply(200, {
          data: [
            {
              id: "2cd2f45a-8a1e-4898-8340-222e80e94e57",
              project_id: "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              standard_item_id: "5bb9bdd7-c53a-48e3-92a7-22791d611199",
              created_at: "2014-12-18T19:28:45.270+08:00",
              updated_at: "2014-12-18T19:28:45.270+08:00"
            },
            {
              id: "e4e3d663-25bb-42c7-8e7b-745974e0a92f",
              project_id: "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              standard_item_id: "5f5ba38f-9346-4e04-93f2-79e9c368f416",
              created_at: "2014-12-18T19:20:32.757+08:00",
              updated_at: "2014-12-18T19:20:32.757+08:00"
            }
          ]
        });
      done();
    });

    it('should respond data', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/standard_items')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              id: "2cd2f45a-8a1e-4898-8340-222e80e94e57",
              project_id: "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              standard_item_id: "5bb9bdd7-c53a-48e3-92a7-22791d611199",
              created_at: "2014-12-18T19:28:45.270+08:00",
              updated_at: "2014-12-18T19:28:45.270+08:00"
            },
            {
              id: "e4e3d663-25bb-42c7-8e7b-745974e0a92f",
              project_id: "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              standard_item_id: "5f5ba38f-9346-4e04-93f2-79e9c368f416",
              created_at: "2014-12-18T19:20:32.757+08:00",
              updated_at: "2014-12-18T19:20:32.757+08:00"
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

  describe('#index() include standard items', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/standard_items?include=standard_items')
        .reply(200, {
          data: [
            {
              id: "2cd2f45a-8a1e-4898-8340-222e80e94e57",
              project_id: "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              standard_item_id: "5bb9bdd7-c53a-48e3-92a7-22791d611199",
              created_at: "2014-12-18T19:28:45.270+08:00",
              updated_at: "2014-12-18T19:28:45.270+08:00"
            },
            {
              id: "e4e3d663-25bb-42c7-8e7b-745974e0a92f",
              project_id: "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              standard_item_id: "5f5ba38f-9346-4e04-93f2-79e9c368f416",
              created_at: "2014-12-18T19:20:32.757+08:00",
              updated_at: "2014-12-18T19:20:32.757+08:00"
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/curriculum/standard_items/5bb9bdd7-c53a-48e3-92a7-22791d611199,5f5ba38f-9346-4e04-93f2-79e9c368f416')
        .reply(200, {
          data: [
            {
              "id": "5bb9bdd7-c53a-48e3-92a7-22791d611199",
              "content": "课程标准条目1.1",
              "position": null,
              "standard_id": "0a2b1195-d5e7-4a96-81a0-cf948a894bb5",
              "created_at": "2014-12-15T14:40:32.366+08:00",
              "updated_at": "2014-12-15T14:40:32.366+08:00"
            },
            {
              "id": "5f5ba38f-9346-4e04-93f2-79e9c368f416",
              "content": "课程标准条目2.1",
              "position": null,
              "standard_id": "4cb2eb18-dcef-40e7-bb10-dc3a93299afb",
              "created_at": "2014-12-15T14:40:32.445+08:00",
              "updated_at": "2014-12-15T14:40:32.445+08:00"
            }
          ]
        });

      done();
    });

    it('should respond items include standard items', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/standard_items?include=standard_items')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              id: "2cd2f45a-8a1e-4898-8340-222e80e94e57",
              project_id: "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              standard_item: {
                "id": "5bb9bdd7-c53a-48e3-92a7-22791d611199",
                "content": "课程标准条目1.1",
                "position": null,
                "standard_id": "0a2b1195-d5e7-4a96-81a0-cf948a894bb5",
                "created_at": "2014-12-15T14:40:32.366+08:00",
                "updated_at": "2014-12-15T14:40:32.366+08:00"
              },
              created_at: "2014-12-18T19:28:45.270+08:00",
              updated_at: "2014-12-18T19:28:45.270+08:00"
            },
            {
              id: "e4e3d663-25bb-42c7-8e7b-745974e0a92f",
              project_id: "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              standard_item: {
                "id": "5f5ba38f-9346-4e04-93f2-79e9c368f416",
                "content": "课程标准条目2.1",
                "position": null,
                "standard_id": "4cb2eb18-dcef-40e7-bb10-dc3a93299afb",
                "created_at": "2014-12-15T14:40:32.445+08:00",
                "updated_at": "2014-12-15T14:40:32.445+08:00"
              },
              created_at: "2014-12-18T19:20:32.757+08:00",
              updated_at: "2014-12-18T19:20:32.757+08:00"
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

});
