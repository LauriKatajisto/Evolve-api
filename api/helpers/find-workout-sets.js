module.exports = {
  friendlyName: 'Find workout sets with given type',

  inputs: {
    workouttype: {
      type: 'string',
      isIn: ['challenge', 'workout'],
      required: true,
      description: 'Workout type',
    },
  },

  fn: async (inputs, exits) => {
    const challenges = await ChallengeWorkout.find({ workouttype: inputs.workouttype }).populate('challenge');

    challenges.forEach((c) => {
      const { challenge } = c;
      const reps = c.reps.split(',');
      if (challenge.length === reps.length) {
        reps.forEach((rep, i) => {
          challenge[i].reps = parseInt(reps[i], 10);
        });
      }
    });

    return exits.success(challenges);
  },
};
