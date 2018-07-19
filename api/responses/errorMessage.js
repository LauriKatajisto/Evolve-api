module.exports = function errorMessage(message, status, err) {
  const { res } = this;
  let code = status;
  if (!code) {
    code = 400;
  }
  sails.log.verbose('Ran custom response: res.errorMessage()');
  return res.status(code).json({ error: true, message, err });
};
