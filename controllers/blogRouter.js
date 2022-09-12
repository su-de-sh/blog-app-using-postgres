const { Op } = require("sequelize");
const { Blog } = require("../models");
const User = require("../models/user");
const { tokenExtractor, userExtractor } = require("../utils/middleware");
require("express-async-errors");

const blogRouter = require("express").Router();

blogRouter.get("/", async (req, res) => {
  let where = {};
  if (req.query.search) {
    where.title = { [Op.substring]: req.query.search };
  }
  const notes = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });

  res.json(notes);
});

blogRouter.post("/", tokenExtractor, userExtractor, async (req, res) => {
  //   const blog = new Blog(req.body)
  // const response= await blog.save()
  // console.log(
  //   "########################################################",
  //   req.body
  // );

  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    userId: req.user.id,
  };
  const newBlog = await Blog.create(blog);

  res.send(newBlog);
});

// blogRouter.delete("/:id", async (req, res) => {
//   const id = req.params.id;

//   const deletedBlog = await Blog.destroy({
//     where: { id: id },
//   });

//   res.status(203).json(deletedBlog);
// });

blogRouter.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByPk(req.params.id);

  updatedBlog.likes = req.body.likes;
  await updatedBlog.save();
  res.json({ likes: updatedBlog.likes });
});

blogRouter.delete("/:id", tokenExtractor, userExtractor, async (req, res) => {
  const blogToDelete = await Blog.findByPk(req.params.id);

  if (req.user.id === blogToDelete.userId) {
    await Blog.destroy({ where: { id: req.params.id } });

    res.status(200).send("Blog deleted successfully!!");
  } else {
    res.json({ error: "You are not authorized to delete." });
  }
});

module.exports = blogRouter;
