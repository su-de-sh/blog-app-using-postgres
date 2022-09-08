const User = require("../models/user")

const userRouter = require("express").Router()

require("express-async-errors")

userRouter.get("/",async(req,res)=>{
   const users = await User.findAll()
    res.status(200).json(users)
})

userRouter.post('/',async(req,res)=>{
    const newUser = await User.create(req.body)
    res.status(200).json(newUser)
})

userRouter.put('/:username',async(req,res)=>{
    const user = await User.findOne({username:req.params.username})
   user.name=req.body.name

   await user.save()
   res.status(200).json(user)

})

module.exports = userRouter