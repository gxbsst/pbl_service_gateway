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
        .get('/curriculum/standard_items/5bb9bdd7-c53a-48e3-92a7-22791d611199,5f5ba38f-9346-4e04-93f2-79e9c368f416?include=parents')
        .reply(200, {
          data: [
            {
              "id": "5f5ba38f-9346-4e04-93f2-79e9c368f416",
              "standard_id": "4cb2eb18-dcef-40e7-bb10-dc3a93299afb",
              "content": "课程标准条目2.1",
              "parents": {
                "standard": {
                  "id": "4cb2eb18-dcef-40e7-bb10-dc3a93299afb",
                  "title": "课程标准2",
                  "position": null,
                  "phase_id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                  "created_at": "2014-12-15T14:40:32.429+08:00",
                  "updated_at": "2014-12-15T14:40:32.429+08:00"
                },
                "phase": {
                  "id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                  "name": "一年级",
                  "position": null,
                  "subject_id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                  "created_at": "2014-12-15T14:38:13.386+08:00",
                  "updated_at": "2014-12-15T14:38:13.386+08:00"
                },
                "subject": {
                  "id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                  "name": "语文",
                  "position": null,
                  "created_at": "2014-12-12T03:51:30.406+08:00",
                  "updated_at": "2014-12-12T03:51:30.406+08:00"
                }
              }
            },
            {
              "id": "5bb9bdd7-c53a-48e3-92a7-22791d611199",
              "standard_id": "0a2b1195-d5e7-4a96-81a0-cf948a894bb5",
              "content": "课程标准条目1.1",
              "parents": {
                "standard": {
                  "id": "0a2b1195-d5e7-4a96-81a0-cf948a894bb5",
                  "title": "课程标准1",
                  "position": null,
                  "phase_id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                  "created_at": "2014-12-15T14:40:32.325+08:00",
                  "updated_at": "2014-12-15T14:40:32.325+08:00"
                },
                "phase": {
                  "id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                  "name": "一年级",
                  "position": null,
                  "subject_id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                  "created_at": "2014-12-15T14:38:13.386+08:00",
                  "updated_at": "2014-12-15T14:38:13.386+08:00"
                },
                "subject": {
                  "id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                  "name": "语文",
                  "position": null,
                  "created_at": "2014-12-12T03:51:30.406+08:00",
                  "updated_at": "2014-12-12T03:51:30.406+08:00"
                }
              }
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
                "standard_id": "0a2b1195-d5e7-4a96-81a0-cf948a894bb5",
                "content": "课程标准条目1.1",
                "parents": {
                  "standard": {
                    "id": "0a2b1195-d5e7-4a96-81a0-cf948a894bb5",
                    "title": "课程标准1",
                    "position": null,
                    "phase_id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                    "created_at": "2014-12-15T14:40:32.325+08:00",
                    "updated_at": "2014-12-15T14:40:32.325+08:00"
                  },
                  "phase": {
                    "id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                    "name": "一年级",
                    "position": null,
                    "subject_id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                    "created_at": "2014-12-15T14:38:13.386+08:00",
                    "updated_at": "2014-12-15T14:38:13.386+08:00"
                  },
                  "subject": {
                    "id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                    "name": "语文",
                    "position": null,
                    "created_at": "2014-12-12T03:51:30.406+08:00",
                    "updated_at": "2014-12-12T03:51:30.406+08:00"
                  }
                }
              },
              created_at: "2014-12-18T19:28:45.270+08:00",
              updated_at: "2014-12-18T19:28:45.270+08:00"
            },
            {
              id: "e4e3d663-25bb-42c7-8e7b-745974e0a92f",
              project_id: "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              standard_item: {
                "id": "5f5ba38f-9346-4e04-93f2-79e9c368f416",
                "standard_id": "4cb2eb18-dcef-40e7-bb10-dc3a93299afb",
                "content": "课程标准条目2.1",
                "parents": {
                  "standard": {
                    "id": "4cb2eb18-dcef-40e7-bb10-dc3a93299afb",
                    "title": "课程标准2",
                    "position": null,
                    "phase_id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                    "created_at": "2014-12-15T14:40:32.429+08:00",
                    "updated_at": "2014-12-15T14:40:32.429+08:00"
                  },
                  "phase": {
                    "id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                    "name": "一年级",
                    "position": null,
                    "subject_id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                    "created_at": "2014-12-15T14:38:13.386+08:00",
                    "updated_at": "2014-12-15T14:38:13.386+08:00"
                  },
                  "subject": {
                    "id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                    "name": "语文",
                    "position": null,
                    "created_at": "2014-12-12T03:51:30.406+08:00",
                    "updated_at": "2014-12-12T03:51:30.406+08:00"
                  }
                }
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

  describe('#index() include standard items (only one item) ', function () {

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
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/curriculum/standard_items/5bb9bdd7-c53a-48e3-92a7-22791d611199?include=parents')
        .reply(200, {
          data: [
            {
              "id": "5bb9bdd7-c53a-48e3-92a7-22791d611199",
              "standard_id": "0a2b1195-d5e7-4a96-81a0-cf948a894bb5",
              "content": "课程标准条目1.1",
              "parents": {
                "standard": {
                  "id": "0a2b1195-d5e7-4a96-81a0-cf948a894bb5",
                  "title": "课程标准1",
                  "position": null,
                  "phase_id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                  "created_at": "2014-12-15T14:40:32.325+08:00",
                  "updated_at": "2014-12-15T14:40:32.325+08:00"
                },
                "phase": {
                  "id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                  "name": "一年级",
                  "position": null,
                  "subject_id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                  "created_at": "2014-12-15T14:38:13.386+08:00",
                  "updated_at": "2014-12-15T14:38:13.386+08:00"
                },
                "subject": {
                  "id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                  "name": "语文",
                  "position": null,
                  "created_at": "2014-12-12T03:51:30.406+08:00",
                  "updated_at": "2014-12-12T03:51:30.406+08:00"
                }
              }
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
                "standard_id": "0a2b1195-d5e7-4a96-81a0-cf948a894bb5",
                "content": "课程标准条目1.1",
                "parents": {
                  "standard": {
                    "id": "0a2b1195-d5e7-4a96-81a0-cf948a894bb5",
                    "title": "课程标准1",
                    "position": null,
                    "phase_id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                    "created_at": "2014-12-15T14:40:32.325+08:00",
                    "updated_at": "2014-12-15T14:40:32.325+08:00"
                  },
                  "phase": {
                    "id": "766c2e95-8410-4f46-bb2c-24691e6488d2",
                    "name": "一年级",
                    "position": null,
                    "subject_id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                    "created_at": "2014-12-15T14:38:13.386+08:00",
                    "updated_at": "2014-12-15T14:38:13.386+08:00"
                  },
                  "subject": {
                    "id": "7e726aa5-3f65-4d7e-a388-a945c550ab49",
                    "name": "语文",
                    "position": null,
                    "created_at": "2014-12-12T03:51:30.406+08:00",
                    "updated_at": "2014-12-12T03:51:30.406+08:00"
                  }
                }
              },
              created_at: "2014-12-18T19:28:45.270+08:00",
              updated_at: "2014-12-18T19:28:45.270+08:00"
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

  describe('#index() include standard items (only one item) ', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/standard_items?include=standard_items')
        .reply(200, {
          data: [
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
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

});
