/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'GET /': 'HelloController.hello',
  'GET /workout': 'WorkoutController.listAll',
  'POST /workout/filter': 'WorkoutController.search',
  'GET /workout/:id': 'WorkoutController.getOne',
  'POST /workout/:id': 'WorkoutController.updateWorkout',
  'POST /workout': 'WorkoutController.addWorkout',

  'POST /savedworkout': 'SavedWorkoutController.createSW',
  'GET /savedworkout/:name': 'SavedWorkoutController.getSW',

  'GET /challenge': 'ChallengeController.getChallenges',
  'GET /workoutset': 'ChallengeController.getWorkoutSet',
  'POST /challenge': 'ChallengeController.createChallenge',
  'POST /challenge/suggest': 'ChallengeController.suggestChallenge',
  'POST /challenge/:id/voteup': 'ChallengeController.challengeVoteUp',
  'POST /challenge/:id/votedown': 'ChallengeController.challengeVoteDown'
};
