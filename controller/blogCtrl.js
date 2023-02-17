const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validMongoId = require("../utils/validateMongodbId");

const createBlog = asyncHandler(async(req,res)=>{
    try{
        const newBlog = await Blog.create(req.body);
        res.json({
            status:"success",
            newBlog
        })
    }catch(err){
        throw new Error(err);
    }
});

const updateBlog = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    try{
        const updateBlog = await Blog.findOneAndUpdate(id,req.body,{new:true});
        res.json({
            message:'Product updated',
            data:updateBlog
        })
    }catch(err){
        throw new Error(err);
    }
});

const getaBlog = asyncHandler(async(req,res)=>{
    try{
        const findBlog = await Blog.findById(req.params.id);
        await Blog.findByIdAndUpdate(req.params.id,{ $inc:{numView:1}},{ new:true }
        );
        res.json({
            // message:'hello Blog',
            data:findBlog
        })
    }catch(err){
        throw new Error(err);
    }
});

const getAllBlogs = asyncHandler(async(req,res)=>{
    try{
        const allBlogs = await Blog.find();
        res.json({allBlogs})
    }catch(err){
        throw new Error(err);
    }
});

const deleteBlog = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    try{
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.json({
            message:'Blog deleted',
            data:deletedBlog
        })
    }catch(err){
        throw new Error(err);
    }
});

module.exports = {createBlog,updateBlog,getaBlog,getAllBlogs,deleteBlog};