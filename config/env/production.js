/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {


  /**************************************************************************
  *                                                                         *
  * Tell Sails what database(s) it should use in production.                *
  *                                                                         *
  * (https://sailsjs.com/config/datastores)                                 *
  *                                                                         *
  **************************************************************************/
  datastores: {

    /***************************************************************************
    *                                                                          *
    * Configure your default production database.                              *
    *                                                                          *
    * 1. Choose an adapter:                                                    *
    *    https://sailsjs.com/plugins/databases                                 *
    *                                                                          *
    * 2. Install it as a dependency of your Sails app.                         *
    *    (For example:  npm install sails-mysql --save)                        *
    *                                                                          *
    * 3. Then set it here (`adapter`), along with a connection URL (`url`)     *
    *    and any other, adapter-specific customizations.                       *
    *    (See https://sailsjs.com/config/datastores for help.)                 *
    *                                                                          *
    ***************************************************************************/
    default: {
      adapter: 'sails-mysql',
      url: process.env.JAWSDB_URL,
      /****************************************************************************
      *                                                                           *
      * More adapter-specific options                                             *
      *                                                                           *
      * > For example, for some hosted PostgreSQL providers (like Heroku), the    *
      * > extra `ssl: true` option is mandatory and must be provided.             *
      *                                                                           *
      * More info:                                                                *
      * https://sailsjs.com/config/datastores                                     *
      *                                                                           *
      ****************************************************************************/
      // ssl: true,

    },

  },



  models: {
    migrate: 'safe',

    /***************************************************************************
    *                                                                          *
    * If, in production, this app has access to physical-layer CASCADE         *
    * constraints (e.g. PostgreSQL or MySQL), then set those up in the         *
    * database and uncomment this to disable Waterline's `cascadeOnDestroy`    *
    * polyfill.  (Otherwise, if you are using a databse like Mongo, you might  *
    * choose to keep this enabled.)                                            *
    *                                                                          *
    ***************************************************************************/
    // cascadeOnDestroy: false,

  },



  blueprints: {
    shortcuts: false,
  },

  /***************************************************************************
  *                                                                          *
  * Configure your security settings for production.                         *
  *                                                                          *
  * IMPORTANT:                                                               *
  * If web browsers will be communicating with your app, be sure that        *
  * you have CSRF protection enabled.  To do that, set `csrf: true` over     *
  * in the `config/security.js` file (not here), so that CSRF app can be     *
  * tested with CSRF protection turned on in development mode too.           *
  *                                                                          *
  ***************************************************************************/
  security: {
    cors: {
     allRoutes: true,
     allowOrigins: '*',
     allowCredentials: false,
   },
  },

  /***************************************************************************
  *                                                                          *
  * Configure how your app handles sessions in production.                   *
  *                                                                          *
  * (https://sailsjs.com/config/session)                                     *
  *                                                                          *
  * > If you have disabled the "session" hook, then you can safely remove    *
  * > this section from your `config/env/production.js` file.                *
  *                                                                          *
  ***************************************************************************/
  session: {
    adapter: '@sailshq/connect-redis',
    url: process.env.REDISTOGO_URL,

    /***************************************************************************
    *                                                                          *
    * Production configuration for the session ID cookie.                      *
    *                                                                          *
    * Tell browsers (or other user agents) to ensure that session ID cookies   *
    * are always transmitted via HTTPS, and that they expire 24 hours after    *
    * they are set.                                                            *
    *                                                                          *
    * Note that with `secure: true` set, session cookies will _not_ be         *
    * transmitted over unsecured (HTTP) connections. Also, for apps behind     *
    * proxies (like Heroku), the `trustProxy` setting under `http` must be     *
    * configured in order for `secure: true` to work.                          *
    *                                                                          *
    * > While you might want to increase or decrease the `maxAge` or provide   *
    * > other options, you should always set `secure: true` in production      *
    * > if the app is being served over HTTPS.                                 *
    *                                                                          *
    * Read more:                                                               *
    * https://sailsjs.com/config/session#?the-session-id-cookie                *
    *                                                                          *
    ***************************************************************************/
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },



  log: {
    level: 'error'
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
    trustProxy: true,
  },


  /**************************************************************************
  *                                                                         *
  * Production overrides for any custom settings specific to your app.      *
  * (for example, production credentials for 3rd party APIs like Stripe)    *
  *                                                                         *
  * > See config/custom.js for more info on how to configure these options. *
  *                                                                         *
  ***************************************************************************/
  custom: {
    baseUrl: 'https://api.tribeofwolvesapp.com',
  },

};
