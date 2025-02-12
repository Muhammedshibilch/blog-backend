const { updateSearchIndex } = require('../models/blogModel');
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')


// register
exports.registerController= async (req,res)=>{
    console.log("inside registerController");

    const {username,email,password}=req.body
    console.log(username,email,password);

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
          res.status(406).json("User alredy exist ....please Login")
        }else{
            const newUser = new users({
                username,email,password,profilepic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }catch(err){
        res.status(401).json(err)
    }
}

// login


exports.loginController= async (req,res)=>{
    console.log("inside registerController");

    const {email,password}=req.body
    console.log(email,password);

    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
             // token generate
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
          res.status(200).json({
            user:existingUser,
            token
          })
        }else{
            res.status(404).json("ivalid emial or password")
        }

    }catch(err){
        res.status(401).json(err)
    }
}

// profile updation
exports.editUserController = async(req,res)=>{
    console.log("inside editUserController")
    const userId = req.userId
    const {username,email,password,profilepic}=req.body
    const uploadProFileImaage =req.file?req.file.filename:profilepic

    try{
        const updatUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,profilepic:uploadProFileImaage
        },{new:true})
        await updatUser.save()
        res.status(200).json(updatUser)

    }catch(err){
        res.status(401).json(err)
        
    }
}
