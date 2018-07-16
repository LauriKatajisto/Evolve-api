module.exports = {
  hello: async function (req, res) {
    res.status(200).json({ text: 'hello' });
  }
}