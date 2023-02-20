const Brand = require('../models/brandModel');
const asyncHandler = require("express-async-handler");
const validMongoId = require("../utils/validateMongodbId");

const createBrand = asyncHandler(async(req,res)=>{
    try{
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    }catch(err){
        throw new Error(err);
    }
});

const updateBrand = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    validMongoId(id)
    try{
        const updateBrand = await Brand.findByIdAndUpdate(id,req.body,{new:true});
        res.json({
            message:'Brand updated',
            data:updateBrand
        })
    }catch(err){
        throw new Error(err);
    }
});

const getaBrand = asyncHandler(async(req,res)=>{
    validMongoId(req.params.id)
    try{
        const findBrand = await Brand.findById(req.params.id);
        res.json({data:findBrand})
    }catch(err){
        throw new Error(err);
    }
});

const getAllBrand = asyncHandler(async(req,res)=>{
    try{
        const allBrand = await Brand.find();
        res.json({allBrand})
    }catch(err){
        throw new Error(err);
    }
});

const deleteBrand = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    validMongoId(id)
    try{
        const deletedBrand = await Brand.findByIdAndDelete(id);
        res.json({
            message:'Brand deleted',
            data:deletedBrand
        })
    }catch(err){
        throw new Error(err);
    }
});

module.exports = { createBrand, updateBrand,deleteBrand, getAllBrand, getaBrand }