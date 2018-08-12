const sails = require('sails');

// Before running any tests...
before(function(done) {
  this.timeout(5000);

  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },

  }, async function(err) {
    if (err) { return done(err); }
    try {
      await Workout.destroy({});
      await Token.destroy({});
      await ChallengeWorkout.destroy({});
      await Token.create({ token: '123' });
      const workout = await Workout.create({ name: 'test workout', tags: ['Gym']}).fetch();
      const challenge = await ChallengeWorkout.create({ name: 'quad blast', workouttype: 'challenge' }).fetch();
      const set = await ChallengeWorkout.create({ name: 'AAA', workouttype: 'workout', reps: '1' }).fetch();
      
      await ChallengeWorkout.addToCollection(set.id, 'challenge').members(workout.id);


    } catch(e) {
      return done(e);
    }

    return done();
  });
});

// After all tests have finished...
after( function(done) {
  sails.lower(done);
});