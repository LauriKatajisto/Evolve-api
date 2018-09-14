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
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0].workouttype).to.be.equal('challenge');
      expect(res.body[0].name).to.be.a('string');
      expect(res.body[0].score).to.be.equal(0);
      expect(res.body[0].name).to.be.equal('ASDSAD');
      cId = res.body[0].id;

      done();
    });
  });

  it('should return array of challenges', function (done) {
    supertest(sails.hooks.http.app)
    .get('/challenge?sortScheme=DESC')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0].workouttype).to.be.equal('challenge');
      expect(res.body[0].name).to.be.a('string');
      expect(res.body[0].score).to.be.equal(0);
      expect(res.body[1].name).to.be.equal('ASDSAD');

      cId = res.body[0].id;

      done();
    });
  });
  it('should check for valid sort OK', function (done) {
    supertest(sails.hooks.http.app)
    .get('/challenge?sort=name')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0].workouttype).to.be.equal('challenge');
      expect(res.body[0].name).to.be.a('string');
      expect(res.body[0].score).to.be.equal(0);
      expect(res.body[1].name).to.be.equal('quad blast');

      cId = res.body[0].id;

      done();
    });
  });
  it('should check for valid sort ERROR', function (done) {
    supertest(sails.hooks.http.app)
    .get('/challenge?sort=xxxx')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(400);
      done();
    });
  });

  it('should check for valid sortScheme', function (done) {
    supertest(sails.hooks.http.app)
    .get('/challenge?sortScheme=XXX')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(400);
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

describe('ChallengeController.suggestChallenge', function() {
  it('should require message and type', function (done) {
    supertest(sails.hooks.http.app)
    .post('/challenge/suggest')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(400);
      done();
    });
  });

  it('should return ok message', function (done) {
    supertest(sails.hooks.http.app)
    .post('/challenge/suggest')
    .send({ type: 'xxx', message: 'xxx', submitter: 'Matti', title: 'Title' })
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.message).to.be.equal('Queued. Thank you.');
      done();
    });
  });
});

