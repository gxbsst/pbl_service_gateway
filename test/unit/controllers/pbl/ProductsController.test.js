var request = require('supertest')
  , nock = require('nock');

describe('pbl/ProductsController', function () {

  describe('#index()', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/products?project_id=306726db-7ddb-47c9-b62d-4daa4155ca49')
        .reply(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "description": "测试产品",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "project_form_id": "1c9d4d70-358f-4887-bd00-1175abb5e704"
            }
          ]
        });
      done();
    });

    it('should respond data', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/products?project_id=306726db-7ddb-47c9-b62d-4daa4155ca49')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "description": "测试产品",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "project_form_id": "1c9d4d70-358f-4887-bd00-1175abb5e704"
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

  describe('#index() include product forms', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/products?project_id=62b45c4f-d3ed-4b12-9262-83043daea9b4&include=product_forms')
        .reply(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "description": "测试产品",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "product_form_id": "0d731510-b64f-4b9f-8b29-8435ac0d9637"
            },
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daer",
              "description": "测试产品",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "product_form_id": "0d731510-b64f-4b9f-8b29-8435ac0d9637"
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/product_forms/0d731510-b64f-4b9f-8b29-8435ac0d9637')
        .reply(200, {
          data: [
            {
              "id": "0d731510-b64f-4b9f-8b29-8435ac0d9637",
              "name": "市场调研报告",
              "description": "市场调研报告相关说明",
              "created_at": "2014-12-17T15:09:30.883+08:00",
              "updated_at": "2014-12-17T15:09:31.800+08:00"
            }
          ]
        });

      done();
    });

    it('should respond data', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/products?project_id=62b45c4f-d3ed-4b12-9262-83043daea9b4&include=product_forms')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "description": "测试产品",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "product_form": {
                "id": "0d731510-b64f-4b9f-8b29-8435ac0d9637",
                "name": "市场调研报告",
                "description": "市场调研报告相关说明",
                "created_at": "2014-12-17T15:09:30.883+08:00",
                "updated_at": "2014-12-17T15:09:31.800+08:00"
              }
            },
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daer",
              "description": "测试产品",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "product_form": {
                "id": "0d731510-b64f-4b9f-8b29-8435ac0d9637",
                "name": "市场调研报告",
                "description": "市场调研报告相关说明",
                "created_at": "2014-12-17T15:09:30.883+08:00",
                "updated_at": "2014-12-17T15:09:31.800+08:00"
              }
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

  describe('#index() include product forms (one item)', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/products?project_id=62b45c4f-d3ed-4b12-9262-83043daea9b4&include=product_forms')
        .reply(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "description": "测试产品",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "product_form_id": "0d731510-b64f-4b9f-8b29-8435ac0d9637"
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/product_forms/0d731510-b64f-4b9f-8b29-8435ac0d9637')
        .reply(200, {
          data: [
            {
              "id": "0d731510-b64f-4b9f-8b29-8435ac0d9637",
              "name": "市场调研报告",
              "description": "市场调研报告相关说明",
              "created_at": "2014-12-17T15:09:30.883+08:00",
              "updated_at": "2014-12-17T15:09:31.800+08:00"
            }
          ]
        });

      done();
    });

    it('should respond data', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/products?project_id=62b45c4f-d3ed-4b12-9262-83043daea9b4&include=product_forms')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "description": "测试产品",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "product_form": {
                "id": "0d731510-b64f-4b9f-8b29-8435ac0d9637",
                "name": "市场调研报告",
                "description": "市场调研报告相关说明",
                "created_at": "2014-12-17T15:09:30.883+08:00",
                "updated_at": "2014-12-17T15:09:31.800+08:00"
              }
            }
          ]
        }, done);
    });

    after(function (done) {
      nock.cleanAll();
      done();
    });

  });

  describe('#index() include product forms (null form)', function () {

    before(function (done) {
      nock("http://localhost:3000")
        .get('/pbl/products?project_id=62b45c4f-d3ed-4b12-9262-83043daea9b4&include=product_forms')
        .reply(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "description": "测试产品",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "product_form_id": "0d731510-b64f-4b9f-8b29-8435ac0d9637"
            }
          ]
        });

      nock("http://localhost:3000")
        .get('/product_forms/0d731510-b64f-4b9f-8b29-8435ac0d9637')
        .reply(200, {
          data: [
            {
              "id": null,
              "name": null,
              "description": null,
              "created_at": null,
              "updated_at": null
            }
          ]
        });

      done();
    });

    it('should respond data', function (done) {
      request(sails.hooks.http.app)
        .get('/pbl/products?project_id=62b45c4f-d3ed-4b12-9262-83043daea9b4&include=product_forms')
        .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          data: [
            {
              "id": "3cf7e45a-42f9-4592-9562-ad8450c7daed",
              "description": "测试产品",
              "project_id": "62b45c4f-d3ed-4b12-9262-83043daea9b4",
              "product_form_id": "0d731510-b64f-4b9f-8b29-8435ac0d9637"
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
