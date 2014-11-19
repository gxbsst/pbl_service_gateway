var request = require('supertest');

describe('CoursesController', function () {

    describe('#index()', function () {
        it('should respond with json', function (done) {
            request(sails.hooks.http.app)
                .get('/courses?access_token=24b5fde0d92e4654cb2e4143c51f72e2c3944c5c0a53f0ae7e020cfb67607978')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

});