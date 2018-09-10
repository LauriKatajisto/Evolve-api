const LRU = require('lru-cache');

module.exports = function cacheHook(sails) {
  let cache = null;

  return {
    initialize: (cb) => {
      const options = {
        max: 100,
        maxAge: 1000 * 60 * 60 * 24,
      };

      cache = LRU(options);
      sails.log('LRU Ready!');
      return cb();
    },
    get: (key) => {
      sails.log('get key', key);
      return cache.get(key);
    },
    set: (key, value) => {
      sails.log('set key', key);
      cache.set(key, value);
    },
    del: (key) => {
      sails.log('del key', key);
      cache.del(key);
    },
    reset: () => {
      cache.reset();
    },
  };
};
