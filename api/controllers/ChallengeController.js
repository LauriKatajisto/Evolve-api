module.exports = {
  async getChallenges(req, res) {
    const challenges = await ChallengeWorkout.find().populate('challenge');

    challenges.forEach((c) => {
      const { challenge } = c;
      const reps = c.reps.split(',');
      reps.forEach((rep, i) => {
        challenge[i].reps = parseInt(reps[i], 10);
      });
    });

    return res.status(200).json(challenges);
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
