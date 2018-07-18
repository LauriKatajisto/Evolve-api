module.exports = {
  async listAll(req, res) {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  },

  async addWorkout(req, res) {
    const params = req.allParams();

    if (!params.name) {
      return res.status(400).json({ error: true, message: 'Missing parameters.' });
    }
    try {
      const addedWorkout = await Workout.create(params).fetch();
      return res.status(200).json(addedWorkout);
    } catch (e) {
      return res.status(400).json({ error: true, message: 'Error creating.' });
    }
  },
};
