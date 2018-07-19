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
};
