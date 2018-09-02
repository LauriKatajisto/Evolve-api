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
    difficulty: {
      type: 'number',
      required: true,
      isIn: [1, 2, 3],
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
