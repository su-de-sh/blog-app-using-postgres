require('dotenv').config()
// const { Sequelize, Model, DataTypes,QueryTypes, BelongsTo } = require('sequelize')
const express = require('express')
const { DATABASE_URL, PORT } = require('./utils/config')
const {sequelize, connectToDatabase} = require("./utils/db")
const {Blog} = require("./models")
const app = express()


app.use(express.json())



// const main = async ()=>{

//   const blogs =  await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
 
//   blogs.forEach(blog =>console.log(blog.author +":"+ "'"+blog.title +"'", blog.likes+"likes"))
// }







// const main = async()=>{

//     const blogs = await Blog.findAll()
//     console.log(JSON.stringify(blogs))

// }

// main()

app.get('/api/blogs', async (req, res) => {
  const notes = await Blog.findAll()

  res.json(notes)
})

app.post('/api/blogs',async(req,res)=>{
  //   const blog = new Blog(req.body)
  // const response= await blog.save()
 console.log(req.body)

  const newBlog = await Blog.create(req.body)

  res.status(200).send(newBlog)
  
})

app.delete('/api/blogs/:id',async (req,res)=>{
  const id = req.params.id
  console.log("here")

  const deletedBlog = await Blog.destroy({
    where: { id: id },
  })

  res.status(203).json(deletedBlog)
}
)


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()