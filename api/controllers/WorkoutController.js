module.exports = {
  async listAll(req, res) {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  },

  async addWorkout(req, res) {
    const params = req.allParams();

    if (!params.name) {
      return res.errorMessage('Missing parameters.', 400);
    }
    try {
      const addedWorkout = await Workout.create(params).fetch();
      return res.status(200).json(addedWorkout);
    } catch (e) {
      return res.errorMessage('Error creating.', 400, e);
    }
  },

  async getOne(req, res) {
    try {
      const { id } = req.allParams();
      const workout = await Workout.findOne({ id });
      return res.status(200).json(workout);
    } catch (e) {
      return res.errorMessage('Unable to find workout', 400, e);
    }
  },

  async updateWorkout(req, res) {
    try {
      const { id, name, tags } = req.allParams();
      const updated = await Workout.update({ id }, { name, tags }).fetch();
      return res.status(200).json(updated);
    } catch (e) {
      return res.errorMessage('Unable to update', 400, e);
    }
  },
};
