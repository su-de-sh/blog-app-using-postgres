require('dotenv').config()
// const { Sequelize, Model, DataTypes,QueryTypes, BelongsTo } = require('sequelize')
const express = require('express')
const { DATABASE_URL, PORT } = require('./utils/config')
const {sequelize, connectToDatabase} = require("./utils/db")
const {Blog} = require("./models")
const blogRouter = require('./controllers/blogRouter')
const { errorHandler } = require('./utils/middleware')
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

// app.get('/api/blogs', async (req, res) => {
//   const notes = await Blog.findAll()

//   res.json(notes)
// })

app.use('/api/blogs',blogRouter)




// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()