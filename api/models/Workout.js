module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'json',
      custom(value) {
        return _.isArray(value);
      },
    },
    workoutcollections: {
      collection: 'savedworkout',
      via: 'workouts',
    },
    challenges: {
      collection: 'ChallengeWorkout',
      via: 'challenge',
    },
  },
};
