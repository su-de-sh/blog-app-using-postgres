const Blog = require('./blogRouter')

Blog.sync()

module.exports = {
  Blog
}