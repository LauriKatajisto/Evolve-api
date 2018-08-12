var supertest = require('supertest');

describe('HelloController.hello', function() {

  describe('#version()', function() {
    it('return version number', function (done) {
      supertest(sails.hooks.http.app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, {
        version: process.env.npm_package_version,
      },done);
    });
  });

});