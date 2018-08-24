module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    workouts: {
      collection: 'workout',
      via: 'workoutcollections',
    },
    reps: {
      type: 'string',
    },
  },
  customToJSON() {
    const x = this;
    x.url = `${sails.config.custom.baseUrl}/savedworkout/${this.name}`;
    return x;
  },
};
