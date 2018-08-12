module.exports = {
  async hello(req, res) {
    res.status(200).json({ version: process.env.npm_package_version });
  },
};


/**
 * @apiDefine requireToken Endpoint requires valid token in Headers.
 * @
 */
