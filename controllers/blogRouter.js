const { Blog } = require('../models')

const blogRouter = require('express').Router()

blogRouter.get('/',async(req,res)=>{
    const notes = await Blog.findAll()

  res.json(notes)
})



module.exports = blogRouter