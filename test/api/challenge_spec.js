var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var cId = null;

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
      expect(res.body[0].score).to.be.equal(0);
      cId = res.body[0].id;

      done();
    });
  });
});

describe('ChallengeController.challengeVoteUp / Down', function() {
  it('should add one to score', function (done) {
    supertest(sails.hooks.http.app)
    .post(`/challenge/${cId}/voteup`)
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.score).to.be.equal(1);
      done();
    });
  });

  it('should handle invalid id', function (done) {
    supertest(sails.hooks.http.app)
    .post('/challenge/ddsad/voteup')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(400);
      done();
    });
  });

  it('should subtract one from score', function (done) {
    supertest(sails.hooks.http.app)
    .post(`/challenge/${cId}/votedown`)
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.score).to.be.equal(0);
      done();
    });
  });
});
