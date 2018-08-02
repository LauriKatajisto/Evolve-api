const Sentencer = require('sentencer');

module.exports = {
  async createSW(req, res) {
    const params = req.allParams();

    if (!params.workouts) {
      return res.errorMessage('Missing parameter workouts!.', 400);
    }

    const name = Sentencer.make('{{adjective}}-{{ noun }}-{{adjective}}-{{nouns}}');
    try {
      const workouts = await SavedWorkout.find({ name });
      if (workouts.length === 0) {
        const newsave = await SavedWorkout.create({ name }).fetch();

        await SavedWorkout.addToCollection(newsave.id, 'workouts').members(params.workouts);

        const savedworkout = await SavedWorkout.findOne({ id: newsave.id }).populate('workouts');
        return res.status(200).json(savedworkout);
      }
      return res.errorMessage('Error saving shit.', 400);
    } catch (e) {
      return res.errorMessage('Error saving shit.', 400, e);
    }
  },

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
