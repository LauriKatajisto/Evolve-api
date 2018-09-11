const sails = require('sails');
require('dotenv').config();

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
      await SavedWorkout.destroy({});
      await Token.create({ token: '123' });
      const workout = await Workout.create({ name: 'test workout', tags: ['Gym'], difficulty: 3}).fetch();
      const workout2 = await Workout.create({ name: 'Easier workout', tags: ['Gym'], difficulty: 2}).fetch();
      const workout3 = await Workout.create({ name: 'Easy workout', tags: ['Gym'], difficulty: 1}).fetch();
      const challenge1 = await ChallengeWorkout.create({ name: 'quad blast', workouttype: 'challenge' }).fetch();
      const challenge2 = await ChallengeWorkout.create({ name: 'ASDSAD', workouttype: 'challenge' }).fetch();
      const set1 = await ChallengeWorkout.create({ name: 'AAA', workouttype: 'workout', reps: '1x4', rating1: '2'  }).fetch();
      const set2 = await ChallengeWorkout.create({ name: 'BBB', workouttype: 'workout', reps: '1', rating1: '4' }).fetch();
      
      await ChallengeWorkout.addToCollection(set1.id, 'challenge').members(workout.id);


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