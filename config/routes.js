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
  'GET /workout/:id': 'WorkoutController.getOne',
  'POST /workout/:id': 'WorkoutController.updateWorkout',
  'POST /workout': 'WorkoutController.addWorkout',
};
