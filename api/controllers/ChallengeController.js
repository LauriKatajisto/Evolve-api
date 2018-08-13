module.exports = {
  /**
   * @api {get} /workoutset Get all curated workouts
   * @apiName GetWorkoutsets
   * @apiGroup Workout Challenges
   * @apiVersion 1.0.0
   *
   */
  async getWorkoutSet(req, res) {
    try {
      const challenges = await sails.helpers.findWorkoutSets('workout');

      return res.status(200).json(challenges);
    } catch (e) {
      return res.errorMessage('Error getting challenges', 400, e);
    }
  },

  /**
   * @api {get} /challenge Get all curated challenges
   * @apiName GetChallenges
   * @apiGroup Workout Challenges
   * @apiVersion 1.0.0
   */
  async getChallenges(req, res) {
    try {
      const challenges = await sails.helpers.findWorkoutSets('challenge');

      return res.status(200).json(challenges);
    } catch (e) {
      return res.errorMessage('Error getting challenges', 400, e);
    }
  },

  /**
   * @api {post} /challenge Create new curated challenge or workoutset
   * @apiName CreateChallenge
   * @apiGroup Workout Challenges
   * @apiVersion 1.0.0
   * @apiSampleRequest off
   * @apiPermission requireToken
   *
   * @apiParam {String} name Challenge name
   * @apiParam {String} submitter Submitter name
   * @apiParam {String} reps Comma separated list of reps for workouts
   * @apiParam {Number[]} challenge Array of ids for challenge
   * @apiParam {string="workout","challenge"} workouttype Type of the challenge
   * @apiParamExample {json} New Challenge
   * {
   * "name": "W challenge",
   * "submitter": "Kaj Laxström",
   * "reps": "5,10",
   * "challenge": [15,20],
   * "workouttype": "workout"
   *}
   */
  async createChallenge(req, res) {
    const params = req.allParams();
    const {
      name,
      submitter,
      reps,
      workouttype,
      challenge,
      description,
      rating1,
      rating2,
      tags,
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
          description,
          rating1,
          rating2,
          tags,
        },
      ).fetch();

      await ChallengeWorkout.addToCollection(newChallenge.id, 'challenge').members(params.challenge);

      return res.status(200).json(newChallenge);
    } catch (e) {
      return res.errorMessage('Error creating challenge!', 400, e);
    }
  },

  /**
   * @api {get} /challenge Get all curated challenges
   * @apiName GetChallenges
   * @apiGroup Workout Challenges
   * @apiVersion 1.0.0
   */
  async suggestChallenge(req, res) {
    if (sails.config.environment !== 'test') {
      try {
        const response = await sails.helpers.sendEmail('New challenge suggestion', 'fasf', 'lauri.katajisto@gmail.com');

        return res.status(200).json({ message: response.message });
      } catch (e) {
        return res.errorMessage('Error Sending email', 400, e);
      }
    }
    return res.status(200).json({ message: 'Queued. Thank you.' });
  },

  /**
   * @api {post} /challenge/:id/voteup Vote challenge up
   * @apiName ChallengeVoteUp
   * @apiGroup Workout Challenges
   * @apiVersion 1.0.0
   * @apiSampleRequest off
   */
  async challengeVoteUp(req, res) {
    const params = req.allParams();
    try {
      const result = await sails.helpers.voteOnChallenge(params.id, 'up');
      return res.status(200).json(result);
    } catch (e) {
      return res.errorMessage('', 400, e);
    }
  },

  /**
   * @api {post} /challenge/:id/voteup Vote challenge up
   * @apiName ChallengeVoteDown
   * @apiGroup Workout Challenges
   * @apiVersion 1.0.0
   * @apiSampleRequest off
   */
  async challengeVoteDown(req, res) {
    const params = req.allParams();
    try {
      const result = await sails.helpers.voteOnChallenge(params.id, 'down');
      return res.status(200).json(result);
    } catch (e) {
      return res.errorMessage('', 400, e);
    }
  },

};
