const express = require('express')
const userController = require('../controllers/userController')
const { addBlogController } = require('../controllers/blogController')
const blogController=require('../controllers/blogController')
const jwtMiddleWare = require('../middleware/middleWare')
const multerMiddleware = require('../middleware/multerMiddleWare')


const router = new express.Router()


// Register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)

// add blog
router.post('/add-blog',jwtMiddleWare,multerMiddleware.single('blogImage'),blogController.addBlogController)

// like blog
// Like a blog 
router.patch('/blogs/like/:id', jwtMiddleWare, blogController.likeBlog);

// user blog
router.get('/user-blog',jwtMiddleWare,blogController.getUserBlogController)

// get all blog
router.get('/all-blog',jwtMiddleWare,blogController.getAllBlogController)


// edit blog
router.put('/blogs/:id/edit',jwtMiddleWare,multerMiddleware.single('blogImage'),blogController.editProjectController)

// delete blog
router.delete('/blogs/:id/remove',jwtMiddleWare,blogController.deleteBlogcontroller)

// edit profile
router.put('/user/edit',jwtMiddleWare,multerMiddleware.single('profilepic'),userController.editUserController)




// // Add comment
// router.post('/blogs/:id/comment', jwtMiddleWare, blogController.addComment);

// // Get comments
// router.get('/blogs/:id/comments', jwtMiddleWare, blogController.getComments);


module.exports =router