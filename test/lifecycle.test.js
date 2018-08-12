const sails = require('sails');

// Before running any tests...
before(function(done) {
  this.timeout(5000);

  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },

  }, async function(err) {
    if (err) { return done(err); }

    await Workout.create({ name: 'test workout'});

    return done();
  });
});

// After all tests have finished...
after( function(done) {

  Workout.destroy({}).then( s => {
    sails.lower(done);
  });
});