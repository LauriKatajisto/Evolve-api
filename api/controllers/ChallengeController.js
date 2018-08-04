module.exports = {
  async getWorkoutSet(req, res) {
    try {
      const challenges = await sails.helpers.findWorkoutSets('workout');

      return res.status(200).json(challenges);
    } catch (e) {
      return res.errorMessage('Error getting challenges', 400, e);
    }
  },

  async getChallenges(req, res) {
    try {
      const challenges = await sails.helpers.findWorkoutSets('challenge');

      return res.status(200).json(challenges);
    } catch (e) {
      return res.errorMessage('Error getting challenges', 400, e);
    }
  },

  async createChallenge(req, res) {
    const params = req.allParams();
    const {
      name,
      submitter,
      reps,
      workouttype,
      challenge,
    } = params;

    if (!name || !workouttype || !reps) {
      return res.errorMessage('Check fields!', 400);
    }
    const repCount = reps.split(',');

    if (repCount.length !== challenge.length) {
      return res.errorMessage('Check reps and challenges!', 400);
    }

    try {
      const newChallenge = await ChallengeWorkout.create(
        {
          name,
          submitter,
          reps,
          workouttype,
        },
      ).fetch();

      await ChallengeWorkout.addToCollection(newChallenge.id, 'challenge').members(params.challenge);

      return res.status(200).json(newChallenge);
    } catch (e) {
      return res.errorMessage('Error creating challenge!', 400, e);
    }
  },
};
