const Sentencer = require('sentencer');

module.exports = {
  /**
   * @api {post} /savedworkout/ Create new saved workout
   * @apiName CreateSavedWorkout
   * @apiGroup SavedWorkouts
   * @apiParam {Number[]} workouts name of saved workout
   * @apiParam {String} reps name of saved workout
   * @apiSampleRequest off
   * @apiVersion 1.0.0
   *
   */
  async createSW(req, res) {
    const params = req.allParams();

    if (!params.workouts && !params.reps) {
      return res.errorMessage('Missing parameter workouts!.', 400);
    }

    const name = Sentencer.make('{{adjective}}-{{ noun }}-{{adjective}}-{{nouns}}');
    try {
      const workouts = await SavedWorkout.find({ name });
      if (workouts.length === 0) {
        const newsave = await SavedWorkout.create({ name, reps: params.reps }).fetch();

        await SavedWorkout.addToCollection(newsave.id, 'workouts').members(params.workouts);

        const savedworkout = await SavedWorkout.findOne({ id: newsave.id }).populate('workouts');
        return res.status(200).json(savedworkout);
      }
      return res.errorMessage('Error saving shit.', 400);
    } catch (e) {
      return res.errorMessage('Error saving shit.', 400, e);
    }
  },

  /**
   * @api {get} /savedworkout/:name Get one saved workout
   * @apiName GetSavedWorkout
   * @apiGroup SavedWorkouts
   * @apiParam {String} name of saved workout
   *
   * @apiVersion 1.0.0
   *
   */
  async getSW(req, res) {
    const params = req.allParams();

    if (!params.name) {
      return res.errorMessage('Missing workouts!.', 400);
    }

    try {
      const savedworkout = await SavedWorkout.findOne({ name: params.name }).populate('workouts');
      if (!savedworkout) {
        return res.errorMessage('Error finding stored workout.', 400);
      }

      return res.status(200).json(savedworkout);
    } catch (e) {
      return res.errorMessage('Error finding stored workout.', 400, e);
    }
  },

};
