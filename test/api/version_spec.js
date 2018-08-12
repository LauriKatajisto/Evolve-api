var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;

describe('HelloController.hello', function() {
  it('should return version number', function (done) {
    supertest(sails.hooks.http.app)
    .get('/')
    .end((err, res) => {
      expect(res.body.version).to.equal(process.env.npm_package_version);
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

});