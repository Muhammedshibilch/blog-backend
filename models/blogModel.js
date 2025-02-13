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
        // userId:{
        //     type:String,
        //     required:true
        // },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users", // Reference to the users collection
            required: true
        },
        
        username:{
            type:String,
        },
        likes: { type: Number, default: 0 },
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }] ,
        // comments: [
        //     {
        //         userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        //         username: { type: String },
        //         text: { type: String, required: true },
        //         date: { type: Date, default: Date.now }
        //     }
        // ]

})
const blogs = mongoose.model("blogs",blogSchema)
module.exports = blogs