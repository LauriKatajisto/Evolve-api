module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    submitter: {
      type: 'string',
    },
    challenge: {
      collection: 'workout',
      via: 'challenges',
    },
    reps: {
      type: 'string',
    },
    workouttype: {
      type: 'string',
      isIn: ['challenge', 'workout'],
      required: true,
    },
  },
};
