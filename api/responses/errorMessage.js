module.exports = function errorMessage() {
  const { req, res } = this;

  sails.log.verbose('Ran custom response: res.expired()');

  if (req.wantsJSON) {
    return res.status(498).send('Token Expired/Invalid');
  }

  return res.status(498).view('498');
};
