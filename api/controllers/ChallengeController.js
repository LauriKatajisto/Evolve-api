const validateParams = (params, validValues) => validValues.includes(params);

const createSearchParams = (params, workouttype) => {
  let paramsAreValid = true;
  const searchParams = {
    workouttype,
  };

  if (params.sortScheme) {
    searchParams.sortScheme = params.sortScheme;
    paramsAreValid = validateParams(params.sortScheme, ['DESC', 'ASC']);
  }
  if (params.sort) {
    searchParams.sort = params.sort;
    paramsAreValid = validateParams(params.sort, ['name', 'score', 'submitter', 'rating1', 'rating2']);
  }

  if (paramsAreValid) {
    return searchParams;
  }
  return paramsAreValid;
};

const get = key => sails.hooks.cache.get(key);
const set = (key, value) => sails.hooks.cache.set(key, value);
const del = () => sails.hooks.cache.reset();

module.exports = {
  /**
   * @api {get} /workoutset Get all curated workouts
   * @apiName GetWorkoutsets
   * @apiGroup WorkoutChallenges
   * @apiParam {sort="name","score","submitter","rating1","rating2"} [sort=name] field to sort with
   * @apiParam {sortScheme="ASC","DESC"} [sortScheme=ASC] field to sort with
   *
   * @apiVersion 1.0.0
   *
   */
  async getWorkoutSet(req, res) {
    const params = req.allParams();
    const searchParams = createSearchParams(params, 'workout');
    const cacheKey = `challenges_${JSON.stringify(searchParams)}`;

    try {
      const cached = get(cacheKey);
      if (cached) {
        return res.status(200).json(JSON.parse(cached));
      }

      const challenges = await sails.helpers.findWorkoutSets.with(searchParams);
      set(cacheKey, JSON.stringify(challenges));

      return res.status(200).json(challenges);
    } catch (e) {
      return res.errorMessage('Error getting challenges', 400, e);
    }
  },

  /**
   * @api {get} /challenge Get all curated challenges
   * @apiName GetChallenges
   * @apiGroup WorkoutChallenges
   * @apiParam {sort="name","score","submitter","rating1","rating2"} [sort=name] field to sort with
   * @apiParam {sortScheme="ASC","DESC"} [sortScheme=ASC] field to sort with
   *
   * @apiVersion 1.0.0
   */
  async getChallenges(req, res) {
    const params = req.allParams();
    const searchParams = createSearchParams(params, 'challenge');
    const cacheKey = `challenges_${JSON.stringify(searchParams)}`;

    try {
      const cached = get(cacheKey);
      if (cached) {
        return res.status(200).json(JSON.parse(cached));
      }
      const challenges = await sails.helpers.findWorkoutSets.with(searchParams);
      set(cacheKey, JSON.stringify(challenges));

      return res.status(200).json(challenges);
    } catch (e) {
      return res.errorMessage('Error getting challenges', 400, e);
    }
  },

  /**
   * @api {post} /challenge Create new curated challenge or workoutset
   * @apiName CreateChallenge
   * @apiGroup WorkoutChallenges
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
      del();
      return res.status(200).json(newChallenge);
    } catch (e) {
      return res.errorMessage('Error creating challenge!', 400, e);
    }
  },

  /**
   * @api {get} /challenge Get all curated challenges
   * @apiName GetChallenges
   * @apiGroup WorkoutChallenges
   * @apiVersion 1.0.0
   */
  async suggestChallenge(req, res) {
    const params = req.allParams();

    if (!params.type || !params.message || !params.submitter || !params.title) {
      return res.errorMessage('Missing parameters.', 400);
    }

    if (sails.config.environment !== 'test') {
      try {
        const body = `
Title: ${params.title}
Type: ${params.type}
Message: ${params.message}
Submitter: ${params.submitter}`;

        const response = await sails.helpers.sendEmail(
          body,
          'New challenge/workout suggestion',
          process.env.ADMIN_EMAILS,
        );

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
   * @apiGroup WorkoutChallenges
   * @apiVersion 1.0.0
   * @apiSampleRequest off
   */
  async challengeVoteUp(req, res) {
    const params = req.allParams();
    try {
      const result = await sails.helpers.voteOnChallenge(params.id, 'up');
      del();
      return res.status(200).json(result);
    } catch (e) {
      return res.errorMessage('', 400, e);
    }
  },

  /**
   * @api {post} /challenge/:id/voteup Vote challenge up
   * @apiName ChallengeVoteDown
   * @apiGroup WorkoutChallenges
   * @apiVersion 1.0.0
   * @apiSampleRequest off
   */
  async challengeVoteDown(req, res) {
    const params = req.allParams();
    try {
      const result = await sails.helpers.voteOnChallenge(params.id, 'down');
      del();
      return res.status(200).json(result);
    } catch (e) {
      return res.errorMessage('', 400, e);
    }
  },

};
