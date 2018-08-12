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
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

});