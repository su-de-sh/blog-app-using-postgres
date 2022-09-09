// const loginRouter = require("express").Router();
// require("express-async-errors");

// loginRouter.post("/", async (req, res) => {
//   console.log(req);
// });

// module.exports = loginRouter;

const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });

  if (!user) {
    return res.status(400).json({ error: "wrong credentials" });
  }
  const isCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!user || !isCorrect) {
    return res.status(400).json({ error: "wrong credentials" });
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(userForToken, config.SEKRET);
  res
    .status(200)
    .json({ token, username: user.username, name: user.name, id: user._id });
});

module.exports = loginRouter;
