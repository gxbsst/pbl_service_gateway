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

  //describe('#show()', function () {
  //
  //  before(function (done) {
  //    nock("http://localhost:3000")
  //      .get('/pbl/projects/1')
  //      .reply(200, {
  //        name: "Project",
  //        description: "PBL Project"
  //      });
  //    done();
  //  });
  //
  //  it('should respond a project', function (done) {
  //    request(sails.hooks.http.app)
  //      .get('/pbl/projects/1')
  //      .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
  //      .expect('Content-Type', /json/)
  //      .expect(200, {
  //        name: "Project",
  //        description: "PBL Project"
  //      }, done);
  //  });
  //
  //  after(function (done) {
  //    nock.cleanAll();
  //    done();
  //  });
  //
  //});
  //
  //describe('#show() - find project include techniques', function () {
  //
  //  before(function (done) {
  //
  //    nock("http://localhost:3000")
  //      .get('/pbl/projects/1?include=techniques')
  //      .reply(200, {
  //        name: "Project",
  //        description: "PBL Project",
  //        techniques: [
  //          { id: 'project_technique_id_1', technique_id: 'technique_id_1' },
  //          { id: 'project_technique_id_2', technique_id: 'technique_id_2' },
  //          { id: 'project_technique_id_3', technique_id: 'technique_id_3' }
  //        ]
  //      });
  //
  //    nock("http://localhost:3000")
  //      .get('/skill/techniques/technique_id_1,technique_id_2,technique_id_3')
  //      .reply(200, [
  //        { id: 'technique_id_1', name: "Technique 1" },
  //        { id: 'technique_id_2', name: "Technique 2" },
  //        { id: 'technique_id_3', name: "Technique 3" }
  //      ]);
  //
  //    done();
  //  });
  //
  //  it('should respond a project with techniques', function (done) {
  //    request(sails.hooks.http.app)
  //      .get('/pbl/projects/1?include=techniques')
  //      .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
  //      .expect('Content-Type', /json/)
  //      .expect(200, {
  //        name: "Project",
  //        description: "PBL Project",
  //        techniques: [
  //          { id: 'project_technique_id_1', technique_id: 'technique_id_1', technique: { id: 'technique_id_1', name: "Technique 1" } },
  //          { id: 'project_technique_id_2', technique_id: 'technique_id_2', technique: { id: 'technique_id_2', name: "Technique 2" } },
  //          { id: 'project_technique_id_3', technique_id: 'technique_id_3', technique: { id: 'technique_id_3', name: "Technique 3" } }
  //        ]
  //      }, done);
  //  });
  //
  //  after(function (done) {
  //    nock.cleanAll();
  //    done();
  //  });
  //
  //});
  //
  //describe('#show() - find project include standard_items', function () {
  //
  //  before(function (done) {
  //
  //    nock("http://localhost:3000")
  //      .get('/pbl/projects/1?include=standard_items')
  //      .reply(200, {
  //        name: "Project",
  //        description: "PBL Project",
  //        standard_items: [
  //          { id: 'project_si_id_1', standard_item_id: 'si_id_1' },
  //          { id: 'project_si_id_2', standard_item_id: 'si_id_2' },
  //          { id: 'project_si_id_3', standard_item_id: 'si_id_3' }
  //        ]
  //      });
  //
  //    nock("http://localhost:3000")
  //      .get('/curriculum/standard_items/si_id_1,si_id_2,si_id_2')
  //      .reply(200, [
  //        { id: 'si_id_1', name: "Item 1" },
  //        { id: 'si_id_1', name: "Item 2" },
  //        { id: 'si_id_3', name: "Item 3"}
  //      ]);
  //
  //    done();
  //  });
  //
  //  it('should respond a project with standard_items', function (done) {
  //    request(sails.hooks.http.app)
  //      .get('/pbl/projects/1?include=standard_items')
  //      .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
  //      .expect('Content-Type', /json/)
  //      .expect(200, {
  //        name: "Project",
  //        description: "PBL Project",
  //        standard_items: [
  //          { id: 'project_si_id_1', standard_item_id: 'si_id_1', standard_item: { id: 'si_id_1', name: "Item 1" } },
  //          { id: 'project_si_id_2', standard_item_id: 'si_id_2', standard_item: { id: 'si_id_2', name: "Item 2" } },
  //          { id: 'project_si_id_3', standard_item_id: 'si_id_3', standard_item: { id: 'si_id_3', name: "Item 3" } }
  //        ]
  //      }, done);
  //  });
  //
  //  after(function (done) {
  //    nock.cleanAll();
  //    done();
  //  });
  //
  //});
  //
  //describe('#show() - find project include rules', function () {
  //
  //  before(function (done) {
  //
  //    nock("http://localhost:3000")
  //      .get('/pbl/projects/1?include=rules')
  //      .reply(200, {
  //        name: "Project",
  //        description: "PBL Project",
  //        rules: ['1', '2', '3']
  //      });
  //
  //    nock("http://localhost:3000")
  //      .get('/pbl/rules/1,2,3')
  //      .reply(200, [{name: "Rule 1"},
  //        {name: "Rule 2"},
  //        {name: "Rule 3"}]);
  //
  //    done();
  //  });
  //
  //  it('should respond a project with rules', function (done) {
  //    request(sails.hooks.http.app)
  //      .get('/pbl/projects/1?include=rules')
  //      .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
  //      .expect('Content-Type', /json/)
  //      .expect(200, {
  //        name: "Project",
  //        description: "PBL Project",
  //        rules: [
  //          {name: "Rule 1"},
  //          {name: "Rule 2"},
  //          {name: "Rule 3"}
  //        ]
  //      }, done);
  //  });
  //
  //  after(function (done) {
  //    nock.cleanAll();
  //    done();
  //  });
  //
  //});
  //
  //describe('#show() - find project include standard_items & rules', function () {
  //
  //  before(function (done) {
  //
  //    nock("http://localhost:3000")
  //      .get('/pbl/projects/1?include=standard_items%2Crules')
  //      .reply(200, {
  //        name: "Project",
  //        description: "PBL Project",
  //        standard_items: ['1', '2', '3'],
  //        rules: ['1', '2', '3']
  //      });
  //
  //    nock("http://localhost:3000")
  //      .get('/curriculum/standard_items/1,2,3')
  //      .reply(200, [{name: "Item 1"},
  //        {name: "Item 2"},
  //        {name: "Item 3"}]);
  //
  //    nock("http://localhost:3000")
  //      .get('/pbl/rules/1,2,3')
  //      .reply(200, [{name: "Rule 1"},
  //        {name: "Rule 2"},
  //        {name: "Rule 3"}]);
  //
  //    done();
  //  });
  //
  //  it('should respond a project with rules', function (done) {
  //    request(sails.hooks.http.app)
  //      .get('/pbl/projects/1?include=standard_items,rules')
  //      .set('Accept', 'application/vnd.ibridgebrige.com; version=1')
  //      .expect('Content-Type', /json/)
  //      .expect(200, {
  //        name: "Project",
  //        description: "PBL Project",
  //        standard_items: [
  //          {name: "Item 1"},
  //          {name: "Item 2"},
  //          {name: "Item 3"}
  //        ],
  //        rules: [
  //          {name: "Rule 1"},
  //          {name: "Rule 2"},
  //          {name: "Rule 3"}
  //        ]
  //      }, done);
  //  });
  //
  //  after(function (done) {
  //    nock.cleanAll();
  //    done();
  //  });
  //
  //});

});
