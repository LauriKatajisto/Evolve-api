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
    tags: {
      type: 'string',
    },
    rating1: {
      type: 'number',
      allowNull: true,
    },
    rating2: {
      type: 'number',
      allowNull: true,
    },
    score: {
      type: 'number',
      defaultsTo: 0,
    },
    workouttype: {
      type: 'string',
      isIn: ['challenge', 'workout'],
      required: true,
    },
  },
};
