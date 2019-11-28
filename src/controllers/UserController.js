const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { user } = req.headers;
    const users = await User.find({ _id: { $ne: user } });
    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    const userExists = await User.findOne({ username: username });

    if (userExists) {
      return res.json({ error: "Usuario já existe!" });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
};
