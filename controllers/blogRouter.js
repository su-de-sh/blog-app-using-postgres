const { Blog } = require('../models')

const blogRouter = require('express').Router()

blogRouter.get('/',async(req,res)=>{
    const notes = await Blog.findAll()

  res.json(notes)
})

blogRouter.post('/',async(req,res)=>{
  //   const blog = new Blog(req.body)
  // const response= await blog.save()
 console.log(req.body)

  const newBlog = await Blog.create(req.body)

  res.status(200).send(newBlog)
  
})

blogRouter.delete('/:id',async (req,res)=>{
  const id = req.params.id
  console.log("here")

  const deletedBlog = await Blog.destroy({
    where: { id: id },
  })

  res.status(203).json(deletedBlog)
}
)

blogRouter.put("/:id",async (req,res)=>{
 
  const updatedBlog = await Blog.findByPk(req.params.id)
  if (updatedBlog) {
    updatedBlog.likes += 1
    await updatedBlog.save()
    res.json({"likes":updatedBlog.likes})
  } else {
    res.status(404).end()
  }
})



module.exports = blogRouter