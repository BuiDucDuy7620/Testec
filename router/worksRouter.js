const express=require('express')
const blogRouter=express.Router()
const blogController=require('../controller/blogController')

blogRouter.post('/postBlog',blogController.postBlog)
blogRouter.get('/getAllBlog',blogController.getAllBlog)
blogRouter.get('/getBlogById/:id',blogController.getBlogById)

module.exports =blogRouter
