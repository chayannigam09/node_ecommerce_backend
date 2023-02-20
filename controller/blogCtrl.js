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
    validMongoId(id)
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
    validMongoId(req.params.id)
    try{
        const findBlog = await Blog.findById(req.params.id).populate("likes");
        const updateViews = await Blog.findByIdAndUpdate(req.params.id,{ $inc:{numView:1}},{ new:true }
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
    validMongoId(id)
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

const likeBlog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;
    validMongoId(blogId)
    try{
        const blog = await Blog.findById(blogId);
        const loginUserId = req?.user?._id;
        const isLiked = blog?.isLiked;
        const alreadyDisliked = blog?.dislikes?.find((userId) => userId?.toString()===loginUserId?.toString())
        if(alreadyDisliked){
            const blog = await Blog.findByIdAndUpdate(blogId,{
                $pull:{dislikes:loginUserId},
                isDisliked:false
            },{new:true});
            res.json(blog);
        }
        if(isLiked){
            const blog = await Blog.findByIdAndUpdate(blogId,{
                $pull:{likes:loginUserId},
                isLiked:false,
            },{new:true});
            res.json(blog);
        }else{
            const blog = await Blog.findByIdAndUpdate(blogId,{
                $push:{likes:loginUserId},
                isLiked:true,
            },{new:true});
            res.json(blog);
        }
    }catch(err){
        throw new Error(err);
    }
});

const disLikeBlog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;
    validMongoId(blogId)
    try{
        const blog = await Blog.findById(blogId);
        const loginUserId = req?.user?._id;
        const isDisLiked = blog?.isDisliked;
        const alreadyLiked = blog?.likes?.find((userId) => userId?.toString()===loginUserId?.toString())
        if(alreadyLiked){
            const blog = await Blog.findByIdAndUpdate(blogId,{
                $pull:{likes:loginUserId},
                isLiked:false
            },{new:true});
            res.json(blog);
        }
        if(isDisLiked){
            const blog = await Blog.findByIdAndUpdate(blogId,{
                $pull:{dislikes:loginUserId},
                isDisliked:false,
            },{new:true});
            res.json(blog);
        }else{
            const blog = await Blog.findByIdAndUpdate(blogId,{
                $push:{dislikes:loginUserId},
                isDisliked:true,
            },{new:true});
            res.json(blog);
        }
    }catch(err){
        throw new Error(err);
    }
});

module.exports = {createBlog,updateBlog,getaBlog,getAllBlogs,deleteBlog,likeBlog,disLikeBlog};