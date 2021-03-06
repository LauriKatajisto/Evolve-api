module.exports = {
  /**
   * @api {get} /workout Get all workouts
   * @apiName GetWorkouts
   * @apiGroup Workout
   * @apiVersion  1.0.0
   *
   * @apiSuccess {json} body Array of workouts
   *
   * @apiSuccessExample {json} Success-Response:
   * [
   *  {
   *  createdAt : 1532012974311,
   *  updatedAt: 1532012974311,
   *  id: 1,
   *  name: "Pull up"
   *  tags: [
   *    "Gym",
   *    "Mixed"
   *    ]
   *  }
   * ]
   *
   * @apiErrorExample {json} Error-Response:
   *     {
   *       "error": true
   *       "message": "Unable to find workouts."
   *     }
   *
   */
  async listAll(req, res) {
    try {
      const workouts = await Workout.find();
      return res.status(200).json(workouts);
    } catch (e) {
      return res.errorMessage('Unable to find workouts.', 400, e);
    }
  },

  /**
   * @api {post} /workout/filter Filter workouts with tags.
   * @apiName FilterWorkouts
   * @apiGroup Workout
   * @apiVersion  1.0.0
   *
   * @apiParam {String[]} tags  Array of tags to filter workouts.
   * @apiParam {Number} [difficulty=1,2,3] Difficulty
   *
   * @apiSuccess {json} body Array of workouts
   * @apiSampleRequest off
   * @apiSuccessExample {json} Success-Response:
   * [
   *  {
   *  createdAt : 1532012974311,
   *  updatedAt: 1532012974311,
   *  id: 1,
   *  name: "Pull up"
   *  tags: [
   *    "Gym",
   *    "Mixed"
   *    ]
   *  }
   * ]
   *
   */
  async search(req, res) {
    const { tags, difficulty } = req.allParams();

    try {
      const searchParams = {};
      if (difficulty) {
        searchParams.difficulty = {
          '<=': difficulty,
        };
      }

      const workouts = await Workout.find(searchParams);

      if (!tags) {
        return res.status(200).json(workouts);
      }
      if (!_.isArray(tags)) {
        return res.errorMessage('Tags need to be an array.', 400);
      }
      const filtered = workouts.filter((w) => {
        let status = false;
        let tagsFound = 0;
        // check if tags from params is found from workout
        tags.forEach((t1) => {
          // loop through all workout tags
          w.tags.forEach((t2) => {
            if (t1 === t2) {
              tagsFound += 1;
            }
          });
          // check if all given tags are found
          if (tagsFound === tags.length) {
            status = true;
          }
        });

        if (status) {
          return w;
        }
        return null;
      });

      return res.status(200).json(filtered);
    } catch (e) {
      return res.errorMessage('Everything is fucked.', 400, e);
    }
  },
  /**
   * @api {post} /workout Add new workout
    * @apiPermission requireToken
    * @apiName CreateWorkout
   * @apiGroup Workout
   * @apiVersion 1.0.0
   * @apiSuccess {Object} body Workout
   * @apiSampleRequest off
   * @apiParam {Number=1,2,3} difficulty Difficulty of workout
   * @apiParam {String} name Name of workout
   * @apiParam {String[]} [tags] Tags for workout
   * @apiSuccessExample {json} Success-Response:
   *  {
   *  createdAt : 1532012974311,
   *  updatedAt: 1532012974311,
   *  id: 1,
   *  name: "Pull up"
   *  tags: [
   *    "Gym",
   *    "Mixed"
   *    ]
   *  }
   */
  async addWorkout(req, res) {
    const params = req.allParams();

    if (!params.name || !params.difficulty) {
      return res.errorMessage('Missing parameters.', 400);
    }
    try {
      const addedWorkout = await Workout.create(params).fetch();
      return res.status(200).json(addedWorkout);
    } catch (e) {
      return res.errorMessage('Error creating.', 400, e);
    }
  },
  /**
   * @api {get} /workout/:id Get one workout
   * @apiName GetOneWorkout
   * @apiGroup Workout
   * @apiVersion  1.0.0
   *
   * @apiParam {number} id Workout id.
   *
   * @apiSuccess {Object} body Workout
   *
   * @apiSuccessExample {json} Success-Response:
   *  {
   *  createdAt : 1532012974311,
   *  updatedAt: 1532012974311,
   *  id: 1,
   *  name: "Pull up"
   *  tags: [
   *    "Gym",
   *    "Mixed"
   *    ]
   *  }
   *
   * @apiErrorExample {json} Error-Response:
   *     {
   *       "error": true
   *       "message": "Unable to find workout."
   *     }
   *
   */
  async getOne(req, res) {
    try {
      const { id } = req.allParams();
      const workout = await Workout.findOne({ id });
      return res.status(200).json(workout);
    } catch (e) {
      return res.errorMessage('Unable to find workout', 400, e);
    }
  },

  /**
   * @api {post} /workout/:id Update existing workout
   * @apiName UpdateWorkout
   * @apiGroup Workout
   * @apiVersion 1.0.0
   * @apiPermission requireToken
   * @apiSuccess {Object} body Workout
   * @apiSampleRequest off
   *
   * @apiSuccessExample {json} Success-Response:
   *  {
   *  createdAt : 1532012974311,
   *  updatedAt: 1532012974311,
   *  id: 1,
   *  name: "Pull up"
   *  tags: [
   *    "Gym",
   *    "Mixed"
   *    ]
   *  }
   */
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
