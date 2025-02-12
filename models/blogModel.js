const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
           type:String,
            required :true
        },
        date:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        blogImage:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        },
        username:{
            type:String,
        },
        likes: { type: Number, default: 0 }

})
const blogs = mongoose.model("blogs",blogSchema)
module.exports = blogs