require('dotenv').config()
const { Sequelize, Model, DataTypes,QueryTypes } = require('sequelize')
const express = require('express')
const app = express()


app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

// const main = async ()=>{

//   const blogs =  await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
 
//   blogs.forEach(blog =>console.log(blog.author +":"+ "'"+blog.title +"'", blog.likes+"likes"))
// }


class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    
  },
  url: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes:{
    type: DataTypes.INTEGER,
    defaultValue:0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

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
// console.log(req.body)

  const newBlog =Blog.create({...req.body})
  res.status(200).json(newBlog)
  
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})