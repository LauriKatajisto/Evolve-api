var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;

let id = null;

describe('SavedWorkout.createSW', function() {
  it('should return new saved workout', function (done) {
    supertest(sails.hooks.http.app)
    .post('/savedworkout')
    .send({ workouts: ['1'] , reps: "5"})
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.workouts).to.be.a('array');
      expect(res.body.reps).to.be.equal('5');
      id = res.body.name; 
      done();
    });
  });
});

describe('SavedWorkout.getSW', function() {
  it('should return saved workout', function (done) {
    supertest(sails.hooks.http.app)
    .get(`/savedworkout/${id}`)
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.workouts).to.be.a('array');
      expect(res.body.name).to.be.equal(id);
      expect(res.body.reps).to.be.equal('5');
      done();
    });
  });
});