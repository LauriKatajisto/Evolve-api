module.exports = {
  friendlyName: 'Find workout sets with given type',

  inputs: {
    workouttype: {
      type: 'string',
      isIn: ['challenge', 'workout'],
      required: true,
      description: 'Workout type',
    },
    sort: {
      type: 'string',
      defaultsTo: 'name',
      isIn: ['name', 'score', 'submitter', 'rating1', 'rating2'],
      description: 'Field to sort with',
    },
    sortScheme: {
      type: 'string',
      defaultsTo: 'ASC',
      isIn: ['ASC', 'DESC'],
      description: 'Scheme to order the results',
    },
  },

  fn: async (inputs, exits) => {
    const challenges = await ChallengeWorkout.find({
      where: { workouttype: inputs.workouttype },
      sort: `${inputs.sort} ${inputs.sortScheme}`,
    })
      .populate('challenge');

    challenges.forEach((c) => {
      const { challenge } = c;
      const reps = c.reps.split(',');
      if (challenge.length === reps.length) {
        reps.forEach((rep, i) => {
          if (rep.indexOf('x') > -1) {
            const rounds = rep.split('x');
            challenge[i].rounds = parseInt(rounds[1], 10);
          } else {
            challenge[i].rounds = 1;
          }
          challenge[i].reps = parseInt(reps[i], 10);
        });
      }
    });

    return exits.success(challenges);
  },
};
