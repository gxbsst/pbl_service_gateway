var request = require('supertest')
  , nock = require('nock');

describe('pbl/RulesController', function () {

  describe('#index()', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/rules')
        .reply(200, {
          data: [
            {
              "id": "6a4f9270-3a88-4619-b307-4b1f34d81240",
              "technique_id": "627f2fd3-8a34-407e-af9f-434c6eeb0939",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": null,
              "weight": "25%",
              "standard": "xxx",
              "level_1": "111",
              "level_2": "222",
              "level_3": null,
              "level_4": null,
              "level_5": null,
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:21:54.930+08:00",
              "updated_at": "2014-12-19T04:22:04.516+08:00"
            },
            {
              "id": "ee70d801-6288-46c2-bb68-80f7bc9c03c7",
              "technique_id": "4579efd9-2d9d-41ae-beb5-af17012ed925",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": null,
              "weight": "30%",
              "standard": "aaa",
              "level_1": "ccc",
              "level_2": "ddd",
              "level_3": "eee",
              "level_4": "fff",
              "level_5": "gggg",
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:13:14.710+08:00",
              "updated_at": "2014-12-19T04:21:40.474+08:00"
            }
          ]
        });
      done();
    });

    it('should respond data', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/rules')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "6a4f9270-3a88-4619-b307-4b1f34d81240",
              "technique_id": "627f2fd3-8a34-407e-af9f-434c6eeb0939",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": null,
              "weight": "25%",
              "standard": "xxx",
              "level_1": "111",
              "level_2": "222",
              "level_3": null,
              "level_4": null,
              "level_5": null,
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:21:54.930+08:00",
              "updated_at": "2014-12-19T04:22:04.516+08:00"
            },
            {
              "id": "ee70d801-6288-46c2-bb68-80f7bc9c03c7",
              "technique_id": "4579efd9-2d9d-41ae-beb5-af17012ed925",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": null,
              "weight": "30%",
              "standard": "aaa",
              "level_1": "ccc",
              "level_2": "ddd",
              "level_3": "eee",
              "level_4": "fff",
              "level_5": "gggg",
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:13:14.710+08:00",
              "updated_at": "2014-12-19T04:21:40.474+08:00"
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

  describe('#index() include techniques', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/rules?include=techniques')
        .reply(200, {
          data: [
            {
              "id": "6a4f9270-3a88-4619-b307-4b1f34d81240",
              "technique_id": "225b14f8-578f-4dbe-86a6-5dc5e56aba5b",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": null,
              "weight": "25%",
              "standard": "xxx",
              "level_1": "111",
              "level_2": "222",
              "level_3": null,
              "level_4": null,
              "level_5": null,
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:21:54.930+08:00",
              "updated_at": "2014-12-19T04:22:04.516+08:00"
            },
            {
              "id": "ee70d801-6288-46c2-bb68-80f7bc9c03c7",
              "technique_id": "c117eae3-adcb-4265-a988-0aff9b73760d",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": null,
              "weight": "30%",
              "standard": "aaa",
              "level_1": "ccc",
              "level_2": "ddd",
              "level_3": "eee",
              "level_4": "fff",
              "level_5": "gggg",
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:13:14.710+08:00",
              "updated_at": "2014-12-19T04:21:40.474+08:00"
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/skill/techniques/225b14f8-578f-4dbe-86a6-5dc5e56aba5b,c117eae3-adcb-4265-a988-0aff9b73760d')
        .reply(200, {
          data: [
            {
              "id": "225b14f8-578f-4dbe-86a6-5dc5e56aba5b",
              "title": "技能2.2.3",
              "position": null,
              "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
              "created_at": "2014-12-15T14:48:57.298+08:00",
              "updated_at": "2014-12-15T14:48:57.298+08:00",
              "description": null
            },
            {
              "id": "c117eae3-adcb-4265-a988-0aff9b73760d",
              "title": "技能2.2.2",
              "position": null,
              "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
              "created_at": "2014-12-15T14:48:57.258+08:00",
              "updated_at": "2014-12-15T14:48:57.258+08:00",
              "description": null
            }
          ]
        });

      done();
    });

    it('should respond items include techniques', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/rules?include=techniques')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "6a4f9270-3a88-4619-b307-4b1f34d81240",
              "technique": {
                "id": "225b14f8-578f-4dbe-86a6-5dc5e56aba5b",
                "title": "技能2.2.3",
                "position": null,
                "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
                "created_at": "2014-12-15T14:48:57.298+08:00",
                "updated_at": "2014-12-15T14:48:57.298+08:00",
                "description": null
              },
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": null,
              "weight": "25%",
              "standard": "xxx",
              "level_1": "111",
              "level_2": "222",
              "level_3": null,
              "level_4": null,
              "level_5": null,
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:21:54.930+08:00",
              "updated_at": "2014-12-19T04:22:04.516+08:00"
            },
            {
              "id": "ee70d801-6288-46c2-bb68-80f7bc9c03c7",
              "technique": {
                "id": "c117eae3-adcb-4265-a988-0aff9b73760d",
                "title": "技能2.2.2",
                "position": null,
                "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
                "created_at": "2014-12-15T14:48:57.258+08:00",
                "updated_at": "2014-12-15T14:48:57.258+08:00",
                "description": null
              },
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": null,
              "weight": "30%",
              "standard": "aaa",
              "level_1": "ccc",
              "level_2": "ddd",
              "level_3": "eee",
              "level_4": "fff",
              "level_5": "gggg",
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:13:14.710+08:00",
              "updated_at": "2014-12-19T04:21:40.474+08:00"
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

  describe('#index() include gauges', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/rules?include=gauges')
        .reply(200, {
          data: [
            {
              "id": "6a4f9270-3a88-4619-b307-4b1f34d81240",
              "technique_id": "225b14f8-578f-4dbe-86a6-5dc5e56aba5b",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": "6d7c9f3a-9edb-493c-bbdb-624d7bbd38c0",
              "weight": "25%",
              "standard": "xxx",
              "level_1": "111",
              "level_2": "222",
              "level_3": null,
              "level_4": null,
              "level_5": null,
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:21:54.930+08:00",
              "updated_at": "2014-12-19T04:22:04.516+08:00"
            },
            {
              "id": "ee70d801-6288-46c2-bb68-80f7bc9c03c7",
              "technique_id": "c117eae3-adcb-4265-a988-0aff9b73760d",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": "8dafbebf-514f-455a-9676-bfdac9a9c607",
              "weight": "30%",
              "standard": "aaa",
              "level_1": "ccc",
              "level_2": "ddd",
              "level_3": "eee",
              "level_4": "fff",
              "level_5": "gggg",
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:13:14.710+08:00",
              "updated_at": "2014-12-19T04:21:40.474+08:00"
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/gauges/6d7c9f3a-9edb-493c-bbdb-624d7bbd38c0,8dafbebf-514f-455a-9676-bfdac9a9c607')
        .reply(200, {
          data: [
            {
              "id": "6d7c9f3a-9edb-493c-bbdb-624d7bbd38c0",
              "level_1": "gauge 3 level 1",
              "level_2": "gauge 3 level 2",
              "level_3": "gauge 3 level 3",
              "level_4": "gauge 3 level 4",
              "level_5": "gauge 3 level 5",
              "level_6": null,
              "level_7": null,
              "technique_id": "6d9b8211-94ac-4ef8-bba7-194889fdc0ad",
              "created_at": "2014-12-15T18:15:28.616+08:00",
              "updated_at": "2014-12-15T18:15:28.616+08:00",
              "reference_count": null
            },
            {
              "id": "8dafbebf-514f-455a-9676-bfdac9a9c607",
              "level_1": "gauge 2 level 1",
              "level_2": "gauge 2 level 2",
              "level_3": "gauge 2 level 3",
              "level_4": "gauge 2 level 4",
              "level_5": "gauge 2 level 5",
              "level_6": null,
              "level_7": null,
              "technique_id": "6d9b8211-94ac-4ef8-bba7-194889fdc0ad",
              "created_at": "2014-12-15T18:15:28.325+08:00",
              "updated_at": "2014-12-15T18:15:28.325+08:00",
              "reference_count": null
            }
          ]
        });

      done();
    });

    it('should respond items include gauges', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/rules?include=gauges')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "6a4f9270-3a88-4619-b307-4b1f34d81240",
              "technique_id": "225b14f8-578f-4dbe-86a6-5dc5e56aba5b",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge": {
                "id": "6d7c9f3a-9edb-493c-bbdb-624d7bbd38c0",
                "level_1": "gauge 3 level 1",
                "level_2": "gauge 3 level 2",
                "level_3": "gauge 3 level 3",
                "level_4": "gauge 3 level 4",
                "level_5": "gauge 3 level 5",
                "level_6": null,
                "level_7": null,
                "technique_id": "6d9b8211-94ac-4ef8-bba7-194889fdc0ad",
                "created_at": "2014-12-15T18:15:28.616+08:00",
                "updated_at": "2014-12-15T18:15:28.616+08:00",
                "reference_count": null
              },
              "weight": "25%",
              "standard": "xxx",
              "level_1": "111",
              "level_2": "222",
              "level_3": null,
              "level_4": null,
              "level_5": null,
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:21:54.930+08:00",
              "updated_at": "2014-12-19T04:22:04.516+08:00"
            },
            {
              "id": "ee70d801-6288-46c2-bb68-80f7bc9c03c7",
              "technique_id": "c117eae3-adcb-4265-a988-0aff9b73760d",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge": {
                "id": "8dafbebf-514f-455a-9676-bfdac9a9c607",
                "level_1": "gauge 2 level 1",
                "level_2": "gauge 2 level 2",
                "level_3": "gauge 2 level 3",
                "level_4": "gauge 2 level 4",
                "level_5": "gauge 2 level 5",
                "level_6": null,
                "level_7": null,
                "technique_id": "6d9b8211-94ac-4ef8-bba7-194889fdc0ad",
                "created_at": "2014-12-15T18:15:28.325+08:00",
                "updated_at": "2014-12-15T18:15:28.325+08:00",
                "reference_count": null
              },
              "weight": "30%",
              "standard": "aaa",
              "level_1": "ccc",
              "level_2": "ddd",
              "level_3": "eee",
              "level_4": "fff",
              "level_5": "gggg",
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:13:14.710+08:00",
              "updated_at": "2014-12-19T04:21:40.474+08:00"
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

  describe('#index() include techniques & gauges', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/rules?include=techniques%2Cgauges')
        .reply(200, {
          data: [
            {
              "id": "6a4f9270-3a88-4619-b307-4b1f34d81240",
              "technique_id": "225b14f8-578f-4dbe-86a6-5dc5e56aba5b",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": "6d7c9f3a-9edb-493c-bbdb-624d7bbd38c0",
              "weight": "25%",
              "standard": "xxx",
              "level_1": "111",
              "level_2": "222",
              "level_3": null,
              "level_4": null,
              "level_5": null,
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:21:54.930+08:00",
              "updated_at": "2014-12-19T04:22:04.516+08:00"
            },
            {
              "id": "ee70d801-6288-46c2-bb68-80f7bc9c03c7",
              "technique_id": "c117eae3-adcb-4265-a988-0aff9b73760d",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge_id": "8dafbebf-514f-455a-9676-bfdac9a9c607",
              "weight": "30%",
              "standard": "aaa",
              "level_1": "ccc",
              "level_2": "ddd",
              "level_3": "eee",
              "level_4": "fff",
              "level_5": "gggg",
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:13:14.710+08:00",
              "updated_at": "2014-12-19T04:21:40.474+08:00"
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/skill/techniques/225b14f8-578f-4dbe-86a6-5dc5e56aba5b,c117eae3-adcb-4265-a988-0aff9b73760d')
        .reply(200, {
          data: [
            {
              "id": "225b14f8-578f-4dbe-86a6-5dc5e56aba5b",
              "title": "技能2.2.3",
              "position": null,
              "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
              "created_at": "2014-12-15T14:48:57.298+08:00",
              "updated_at": "2014-12-15T14:48:57.298+08:00",
              "description": null
            },
            {
              "id": "c117eae3-adcb-4265-a988-0aff9b73760d",
              "title": "技能2.2.2",
              "position": null,
              "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
              "created_at": "2014-12-15T14:48:57.258+08:00",
              "updated_at": "2014-12-15T14:48:57.258+08:00",
              "description": null
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/gauges/6d7c9f3a-9edb-493c-bbdb-624d7bbd38c0,8dafbebf-514f-455a-9676-bfdac9a9c607')
        .reply(200, {
          data: [
            {
              "id": "6d7c9f3a-9edb-493c-bbdb-624d7bbd38c0",
              "level_1": "gauge 3 level 1",
              "level_2": "gauge 3 level 2",
              "level_3": "gauge 3 level 3",
              "level_4": "gauge 3 level 4",
              "level_5": "gauge 3 level 5",
              "level_6": null,
              "level_7": null,
              "technique_id": "6d9b8211-94ac-4ef8-bba7-194889fdc0ad",
              "created_at": "2014-12-15T18:15:28.616+08:00",
              "updated_at": "2014-12-15T18:15:28.616+08:00",
              "reference_count": null
            },
            {
              "id": "8dafbebf-514f-455a-9676-bfdac9a9c607",
              "level_1": "gauge 2 level 1",
              "level_2": "gauge 2 level 2",
              "level_3": "gauge 2 level 3",
              "level_4": "gauge 2 level 4",
              "level_5": "gauge 2 level 5",
              "level_6": null,
              "level_7": null,
              "technique_id": "6d9b8211-94ac-4ef8-bba7-194889fdc0ad",
              "created_at": "2014-12-15T18:15:28.325+08:00",
              "updated_at": "2014-12-15T18:15:28.325+08:00",
              "reference_count": null
            }
          ]
        });

      done();
    });

    it('should respond items include techniques & gauges', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/rules?include=techniques,gauges')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "6a4f9270-3a88-4619-b307-4b1f34d81240",
              "technique": {
                "id": "225b14f8-578f-4dbe-86a6-5dc5e56aba5b",
                "title": "技能2.2.3",
                "position": null,
                "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
                "created_at": "2014-12-15T14:48:57.298+08:00",
                "updated_at": "2014-12-15T14:48:57.298+08:00",
                "description": null
              },
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge": {
                "id": "6d7c9f3a-9edb-493c-bbdb-624d7bbd38c0",
                "level_1": "gauge 3 level 1",
                "level_2": "gauge 3 level 2",
                "level_3": "gauge 3 level 3",
                "level_4": "gauge 3 level 4",
                "level_5": "gauge 3 level 5",
                "level_6": null,
                "level_7": null,
                "technique_id": "6d9b8211-94ac-4ef8-bba7-194889fdc0ad",
                "created_at": "2014-12-15T18:15:28.616+08:00",
                "updated_at": "2014-12-15T18:15:28.616+08:00",
                "reference_count": null
              },
              "weight": "25%",
              "standard": "xxx",
              "level_1": "111",
              "level_2": "222",
              "level_3": null,
              "level_4": null,
              "level_5": null,
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:21:54.930+08:00",
              "updated_at": "2014-12-19T04:22:04.516+08:00"
            },
            {
              "id": "ee70d801-6288-46c2-bb68-80f7bc9c03c7",
              "technique": {
                "id": "c117eae3-adcb-4265-a988-0aff9b73760d",
                "title": "技能2.2.2",
                "position": null,
                "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
                "created_at": "2014-12-15T14:48:57.258+08:00",
                "updated_at": "2014-12-15T14:48:57.258+08:00",
                "description": null
              },
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "gauge": {
                "id": "8dafbebf-514f-455a-9676-bfdac9a9c607",
                "level_1": "gauge 2 level 1",
                "level_2": "gauge 2 level 2",
                "level_3": "gauge 2 level 3",
                "level_4": "gauge 2 level 4",
                "level_5": "gauge 2 level 5",
                "level_6": null,
                "level_7": null,
                "technique_id": "6d9b8211-94ac-4ef8-bba7-194889fdc0ad",
                "created_at": "2014-12-15T18:15:28.325+08:00",
                "updated_at": "2014-12-15T18:15:28.325+08:00",
                "reference_count": null
              },
              "weight": "30%",
              "standard": "aaa",
              "level_1": "ccc",
              "level_2": "ddd",
              "level_3": "eee",
              "level_4": "fff",
              "level_5": "gggg",
              "level_6": null,
              "level_7": null,
              "created_at": "2014-12-19T04:13:14.710+08:00",
              "updated_at": "2014-12-19T04:21:40.474+08:00"
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

})
;
