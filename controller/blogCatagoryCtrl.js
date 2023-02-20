const Catagory = require('../models/blogCatagoryModel');
const asyncHandler = require("express-async-handler");
const validMongoId = require("../utils/validateMongodbId");

const createCatagory = asyncHandler(async(req,res)=>{
    try{
        const newCatagory = await Catagory.create(req.body);
        res.json(newCatagory);
    }catch(err){
        throw new Error(err);
    }
});

const updateCatagory = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    validMongoId(id)
    try{
        const updateCatagory = await Catagory.findByIdAndUpdate(id,req.body,{new:true});
        res.json({
            message:'Catagory updated',
            data:updateCatagory
        })
    }catch(err){
        throw new Error(err);
    }
});

const getaCatagory = asyncHandler(async(req,res)=>{
    validMongoId(req.params.id)
    try{
        const findCatagory = await Catagory.findById(req.params.id);
        res.json({data:findCatagory})
    }catch(err){
        throw new Error(err);
    }
});

const getAllCatagory = asyncHandler(async(req,res)=>{
    try{
        const allCatagory = await Catagory.find();
        res.json({allCatagory})
    }catch(err){
        throw new Error(err);
    }
});

const deleteCatagory = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    validMongoId(id)
    try{
        const deletedCatagory = await Catagory.findByIdAndDelete(id);
        res.json({
            message:'Catagory deleted',
            data:deletedCatagory
        })
    }catch(err){
        throw new Error(err);
    }
});

module.exports = { createCatagory, updateCatagory,deleteCatagory, getAllCatagory, getaCatagory }