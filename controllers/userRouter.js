const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { Blog } = require("../models");

const userRouter = require("express").Router();

require("express-async-errors");

userRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ["title"],
    },
    attributes: { exclude: ["passwordHash"] },
  });
  res.status(200).json(users);
});

userRouter.post("/", async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  const userInfo = {
    name: req.body.name,
    username: req.body.username,
    passwordHash: passwordHash,
  };
  const newUser = await User.create(userInfo);
  res.status(200).json(newUser);
});

userRouter.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (!user) res.send({ error: "username not found" });
  user.username = req.body.username;

  await user.save();
  res.status(200).json(user);
});

module.exports = userRouter;
