var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;

describe('ChallengeController.getChallenges', function() {
  it('should return array of challenges', function (done) {
    supertest(sails.hooks.http.app)
    .get('/challenge')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0].workouttype).to.be.equal('challenge');
      expect(res.body[0].name).to.be.a('string');
      done();
    });
  });
});