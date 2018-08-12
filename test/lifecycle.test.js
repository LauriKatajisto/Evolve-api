const sails = require('sails');

// Before running any tests...
before(function(done) {
  this.timeout(5000);

  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },

  }, async function(err) {
    if (err) { return done(err); }
    await Workout.destroy({});
    await Token.destroy({});
    await Token.create({ token: '123' });
    await Workout.create({ name: 'test workout', tags: ['Gym']});

    return done();
  });
});

// After all tests have finished...
after( function(done) {
  sails.lower(done);
});