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
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0].workouttype).to.be.equal('workout');
      expect(res.body[0].name).to.be.a('string');
      expect(res.body[0].name).to.be.equal('AAA');
      expect(res.body[1].name).to.be.equal('BBB');
      
      done();
    });
  });

  it('should order results in descending order', function (done) {
    supertest(sails.hooks.http.app)
    .get('/workoutset?sortScheme=DESC')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0].workouttype).to.be.equal('workout');
      expect(res.body[0].name).to.be.a('string');
      expect(res.body[1].name).to.be.equal('AAA');
      expect(res.body[0].name).to.be.equal('BBB');
      
      done();
    });
  });

  it('should handle sorting', function (done) {
    supertest(sails.hooks.http.app)
    .get('/workoutset?sort=rating1')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0].workouttype).to.be.equal('workout');
      expect(res.body[0].rating1).to.be.equal(2);
      expect(res.body[1].rating1).to.be.equal(4);
      
      done();
    });
  });

  it('should handle sorting', function (done) {
    supertest(sails.hooks.http.app)
    .get('/workoutset?sort=ccc')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(400);
      
      done();
    });
  });
});
