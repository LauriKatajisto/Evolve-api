var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;

describe('WorkoutController.listAll', function() {
  it('should return array of workouts', function (done) {
    supertest(sails.hooks.http.app)
    .get('/workout')
    .end((err, res) => {
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.lengthOf(3);
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
    .send({ name: 'Second workout', tags: ['Calisthenics'], difficulty: 2 })
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


describe('WorkoutController.search', function() {
  it('find Gym workouts', function (done) {
    supertest(sails.hooks.http.app)
    .post('/workout/filter')
    .send({ tags: ['Gym'] })
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body.length).to.be.equal(3);
      expect(res.body[0].tags[0]).to.be.equal('Gym');
      done();
    });
  });

  it('find Gym workouts with difficulty === 2', function (done) {
    supertest(sails.hooks.http.app)
    .post('/workout/filter')
    .send({ tags: ['Gym'], difficulty: 2 })
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body.length).to.be.equal(2);
      expect(res.body[0].difficulty).to.be.equal(3);
      expect(res.body[1].difficulty).to.be.equal(2);
      done();
    });
  });

  it('find Gym workouts with difficulty === 3', function (done) {
    supertest(sails.hooks.http.app)
    .post('/workout/filter')
    .send({ tags: ['Gym'], difficulty: 3 })
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body.length).to.be.equal(1);
      expect(res.body[0].difficulty).to.be.equal(3);
      done();
    });
  });

  it('find Gym workouts with difficulty === 1', function (done) {
    supertest(sails.hooks.http.app)
    .post('/workout/filter')
    .send({ tags: ['Gym'], difficulty: 1 })
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body.length).to.be.equal(3);
      expect(res.body[0].difficulty).to.be.equal(3);
      expect(res.body[1].difficulty).to.be.equal(2);
      expect(res.body[2].difficulty).to.be.equal(1);
      done();
    });
  });

  it('find without tags workouts with difficulty === 1', function (done) {
    supertest(sails.hooks.http.app)
    .post('/workout/filter')
    .send({ difficulty: 1 })
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body.length).to.be.equal(4);
      expect(res.body[0].difficulty).to.be.equal(3);
      expect(res.body[1].difficulty).to.be.equal(2);
      expect(res.body[2].difficulty).to.be.equal(1);
      done();
    });
  });

  it('tags needs to be an array if given', function (done) {
    supertest(sails.hooks.http.app)
    .post('/workout/filter')
    .send({ tags: 'nakki' })
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(400);
      expect(res.body.message).to.be.equal('Tags need to be an array.');
      done();
    });
  });

});

