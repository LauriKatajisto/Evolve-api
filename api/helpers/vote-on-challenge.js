module.exports = {
  friendlyName: 'Add or subtract score on Challenge',

  inputs: {
    challengeId: {
      type: 'number',
      required: true,
      description: 'Challenge id',
    },
    voteMode: {
      type: 'string',
      required: true,
      isIn: ['up', 'down'],
    },
  },
  exits: {
    voteError: {
      description: 'Error voting on Challenge',
    },
  },

  fn: async (inputs, exits) => {
    try {
      const challenge = await ChallengeWorkout.findOne({ id: inputs.challengeId });
      let newScore = parseInt(challenge.score, 10);
      if (inputs.voteMode === 'up') {
        newScore += 1;
      } else {
        newScore -= 1;
      }
      const updatedChallenge = await ChallengeWorkout.update({ id: inputs.challengeId }, { score: newScore }).fetch();

      return exits.success(updatedChallenge[0]);
    } catch (e) {
      return exits.voteError(e);
    }
  },
};
