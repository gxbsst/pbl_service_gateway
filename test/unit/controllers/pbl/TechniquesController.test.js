var request = require('supertest')
  , nock = require('nock');

describe('pbl/TechniquesController', function () {

  describe('#index()', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/techniques')
        .reply(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "technique_id": "1c9d4d70-358f-4887-bd00-1175abb5e704",
              "created_at": "2014-12-18T22:48:19.854+08:00",
              "updated_at": "2014-12-18T22:48:19.854+08:00"
            },
            {
              "id": "627f2fd3-8a34-407e-af9f-434c6eeb0939",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "technique_id": "c117eae3-adcb-4265-a988-0aff9b73760d",
              "created_at": "2014-12-18T22:48:18.770+08:00",
              "updated_at": "2014-12-18T22:48:18.770+08:00"
            }
          ]
        });
      done();
    });

    it('should respond data', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/techniques')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "technique_id": "1c9d4d70-358f-4887-bd00-1175abb5e704",
              "created_at": "2014-12-18T22:48:19.854+08:00",
              "updated_at": "2014-12-18T22:48:19.854+08:00"
            },
            {
              "id": "627f2fd3-8a34-407e-af9f-434c6eeb0939",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "technique_id": "c117eae3-adcb-4265-a988-0aff9b73760d",
              "created_at": "2014-12-18T22:48:18.770+08:00",
              "updated_at": "2014-12-18T22:48:18.770+08:00"
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
        .get('/pbl/techniques?include=techniques')
        .reply(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "technique_id": "1c9d4d70-358f-4887-bd00-1175abb5e704",
              "created_at": "2014-12-18T22:48:19.854+08:00",
              "updated_at": "2014-12-18T22:48:19.854+08:00"
            },
            {
              "id": "627f2fd3-8a34-407e-af9f-434c6eeb0939",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "technique_id": "c117eae3-adcb-4265-a988-0aff9b73760d",
              "created_at": "2014-12-18T22:48:18.770+08:00",
              "updated_at": "2014-12-18T22:48:18.770+08:00"
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/skill/techniques/1c9d4d70-358f-4887-bd00-1175abb5e704,c117eae3-adcb-4265-a988-0aff9b73760d')
        .reply(200, {
          data: [
            {
              "id": "c117eae3-adcb-4265-a988-0aff9b73760d",
              "title": "技能2.2.2",
              "position": null,
              "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
              "created_at": "2014-12-15T14:48:57.258+08:00",
              "updated_at": "2014-12-15T14:48:57.258+08:00",
              "description": null
            },
            {
              "id": "1c9d4d70-358f-4887-bd00-1175abb5e704",
              "title": "技能2.2.1",
              "position": null,
              "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
              "created_at": "2014-12-15T14:48:57.247+08:00",
              "updated_at": "2014-12-15T14:48:57.247+08:00",
              "description": null
            }
          ]
        });

      done();
    });

    it('should respond items include standard items', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/techniques?include=techniques')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "technique": {
                "id": "1c9d4d70-358f-4887-bd00-1175abb5e704",
                "title": "技能2.2.1",
                "position": null,
                "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
                "created_at": "2014-12-15T14:48:57.247+08:00",
                "updated_at": "2014-12-15T14:48:57.247+08:00",
                "description": null
              },
              "created_at": "2014-12-18T22:48:19.854+08:00",
              "updated_at": "2014-12-18T22:48:19.854+08:00"
            },
            {
              "id": "627f2fd3-8a34-407e-af9f-434c6eeb0939",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "technique": {
                "id": "c117eae3-adcb-4265-a988-0aff9b73760d",
                "title": "技能2.2.2",
                "position": null,
                "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
                "created_at": "2014-12-15T14:48:57.258+08:00",
                "updated_at": "2014-12-15T14:48:57.258+08:00",
                "description": null
              },
              "created_at": "2014-12-18T22:48:18.770+08:00",
              "updated_at": "2014-12-18T22:48:18.770+08:00"
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

  describe('#index() include techniques (one technique)', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/techniques?include=techniques')
        .reply(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "technique_id": "1c9d4d70-358f-4887-bd00-1175abb5e704",
              "created_at": "2014-12-18T22:48:19.854+08:00",
              "updated_at": "2014-12-18T22:48:19.854+08:00"
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/skill/techniques/1c9d4d70-358f-4887-bd00-1175abb5e704')
        .reply(200, {
          "id": "1c9d4d70-358f-4887-bd00-1175abb5e704",
          "title": "技能2.2.1",
          "position": null,
          "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
          "created_at": "2014-12-15T14:48:57.247+08:00",
          "updated_at": "2014-12-15T14:48:57.247+08:00",
          "description": null
        }
      );

      done();
    });

    it('should respond items include standard items', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/techniques?include=techniques')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "technique": {
                "id": "1c9d4d70-358f-4887-bd00-1175abb5e704",
                "title": "技能2.2.1",
                "position": null,
                "sub_category_id": "03939054-63ca-4b38-9924-54421c709246",
                "created_at": "2014-12-15T14:48:57.247+08:00",
                "updated_at": "2014-12-15T14:48:57.247+08:00",
                "description": null
              },
              "created_at": "2014-12-18T22:48:19.854+08:00",
              "updated_at": "2014-12-18T22:48:19.854+08:00"
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
