/**
 * has-valid-token
*/

module.exports = async function (req, res, proceed) {
  if (!req.headers.token) {
    return res.errorMessage('Endpoint requires token!', 401);
  }

  try {
    const token = await Token.findOne({ token: req.headers.token });
    if (!token) {
      return res.errorMessage('Invalid token!', 401);
    }
    sails.log('Token ID', token.id, 'made a request.');
  } catch (e) {
    return res.errorMessage('Token check error!', 401);
  }

  return proceed();
};
