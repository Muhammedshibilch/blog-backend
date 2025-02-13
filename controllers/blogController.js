const blogs = require('../models/blogModel');
const projectController = require('../models/blogModel')

// add Blog

exports.addBlogController = async(req,res)=>{
    console.log("inside addBlogController");

    const userId = req.userId
  
    const {title,date,description,username}=req.body
    const blogImage =req.file.filename

    try{
        const existinBlog = await blogs.findOne({title})
        if(existinBlog){
              res.status(406).json("Blog alredy exist please upload another")
        }else{
               const newBlog =new blogs({
                title,date,description,blogImage,userId,username
               })
               await newBlog.save()
               res.status(200).json(newBlog)
        }

    }catch(err){
        res.status(401).json(err)

    }
}

// get  autorized user blogs
exports.getUserBlogController= async(req,res)=>{
console.log("inside getUserBlogController");
const userId=req.userId

try{
    // const allUserBlogs = await blogs.find({userId})
    const allUserBlogs = await blogs.find({ userId }).populate("userId", "username");

    res.status(200).json(allUserBlogs)

}catch(err){
    res.status(401).json(err)
}
}
    

// get allblogs
exports.getAllBlogController= async(req,res)=>{
    console.log("inside getAllBlogController");
    
    try{
        // const allBlogs = await blogs.find()
        const allBlogs = await blogs.find().populate("userId", "username");

        res.status(200).json(allBlogs)
    
    }catch(err){
        res.status(401).json(err)
    }
    }

  // edit blog

  exports.editProjectController = async(req,res)=>{
    console.log("inside editProjectController");
    const {id} =req.params 
    const {title,date,description,blogImage}=req.body
    const reUploadImageFile = req.file?req.file.filename:blogImage
    const userId = req.userId
    console.log(id,title,date,description,blogImage, reUploadImageFile,userId);

    try{
        const updatedBlog = await blogs.findByIdAndUpdate({_id:id},{
            title,date,description,blogImage:reUploadImageFile,userId
        },{new:true})
        await updatedBlog.save()
        res.status(200).json(updatedBlog)

    }catch(err){
        res.status(401).json(err)
    }
    
    

  }

//   delete blog

exports.deleteBlogcontroller = async(req,res)=>{
    console.log("inside deleteBlogcontroller");
    const {id} = req.params

    try{
        const removeProject = await blogs.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)

    }catch(err){
        res.status(401).json(err)
    }
    

}
// like
exports.likeBlog = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId; // Ensure this is correct

    try {
        const blog = await blogs.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.likedBy.includes(userId)) {
            return res.status(400).json({ message: "You have already liked this blog" });
        }

        blog.likes += 1;
        blog.likedBy.push(userId);
        await blog.save();

        res.status(200).json({ message: "Blog liked successfully", likes: blog.likes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// // Add comment to a blog
// exports.addComment = async (req, res) => {
//     const { id } = req.params; // Blog ID
//     const { text } = req.body;
//     const userId = req.userId; // From JWT middleware

//     try {
//         const blog = await Blogs.findById(id).populate('userId', 'username');

//         if (!blog) {
//             return res.status(404).json({ message: "Blog not found" });
//         }

//         const newComment = {
//             userId,
//             username: req.username, // Assuming username is stored in req
//             text
//         };

//         blog.comments.push(newComment);
//         await blog.save();

//         res.status(200).json(blog.comments);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Fetch comments for a blog
// exports.getComments = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const blog = await Blogs.findById(id).populate('comments.userId', 'username');

//         if (!blog) {
//             return res.status(404).json({ message: "Blog not found" });
//         }

//         res.status(200).json(blog.comments);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


