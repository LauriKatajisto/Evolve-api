var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;

describe('ChallengeController.getWorkoutSet', function() {
  it('should return array of workoutsets', function (done) {
    supertest(sails.hooks.http.app)
    .get('/workoutset')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0].workouttype).to.be.equal('workout');
      expect(res.body[0].name).to.be.a('string');
      done();
    });
  });
});
