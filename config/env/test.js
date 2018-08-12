module.exports = {
  datastores: {
    default: {
      adapter: 'sails-disk',
    },
  },
  models: {
    migrate: 'alter',
  },
  blueprints: {
    shortcuts: false,
  },
  security: {
    cors: {
     allRoutes: true,
     allowOrigins: '*',
     allowCredentials: false,
   },
  },

  log: {
    level: 'debug'
  },
  custom: {
    baseUrl: 'http://localhost:1337',
  },

};
