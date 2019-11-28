const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { username, password, token } = req.body;

    const loggedUser = await User.findOne({
      username: username,
      password: password
    });

    if (!loggedUser) {
      return res.json({ error: "Usuario não existe!" });
    }

    loggedUser.token = token;

    await loggedUser.save();

    return res.json(loggedUser);
  }
};
