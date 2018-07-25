/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  '*': true,
  HelloController: {
    hello: ['has-valid-token']
  },
  WorkoutController: {
    addWorkout: ['has-valid-token'],
    updateWorkout: ['has-valid-token']
  }
};
