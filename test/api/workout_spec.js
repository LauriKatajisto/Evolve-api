var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;

describe('WorkoutController.listAll', function() {
  it('should return array of workouts', function (done) {
    supertest(sails.hooks.http.app)
    .get('/workout')
    .end((err, res) => {
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0]).to.be.a('object');
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('tags');
      expect(res.body[0].tags).to.be.a('array');
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});

describe('WorkoutController.addWorkout', function() {
  it('should require token', function (done) {
    supertest(sails.hooks.http.app)
    .post('/workout')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(401);
      expect(res.body.error).to.be.equal(true);
      expect(res.body.message).to.be.equal('Endpoint requires token!');
      done();
    });
  });
  it('return new workout', function (done) {
    supertest(sails.hooks.http.app)
    .post('/workout')
    .set('Token', '123')
    .send({ name: 'Second workout', tags: ['Gym'] })
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('tags');
      expect(res.body.tags).to.be.a('array');
      done();
    });
  });
});

describe('WorkoutController.updateWorkout', function() {
  it('should require token', function (done) {
    supertest(sails.hooks.http.app)
    .post('/workout/1')
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(401);
      expect(res.body.error).to.be.equal(true);
      expect(res.body.message).to.be.equal('Endpoint requires token!');
      done();
    });
  });
});

