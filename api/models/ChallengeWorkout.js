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
    description: {
      type: 'string',
    },
    rating1: {
      type: 'number',
    },
    rating2: {
      type: 'number',
    },
    workouttype: {
      type: 'string',
      isIn: ['challenge', 'workout'],
      required: true,
    },
  },
};
