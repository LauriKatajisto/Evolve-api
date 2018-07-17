module.exports = {
  async hello(req, res) {
    res.status(200).json({ text: 'hello' });
  },
};
