const Coupun = require('../models/coupunModel');
const asyncHandler = require("express-async-handler");
const validMongoId = require("../utils/validateMongodbId");

const createCoupun = asyncHandler(async(req,res)=>{
    try{
        const newCoupun = await Coupun.create(req.body);
        res.json(newCoupun);
    }catch(err){
        throw new Error(err);
    }
});

const getAllCoupun = asyncHandler(async(req,res)=>{
    try{
        const allCoupun = await Coupun.find();
        res.json({allCoupun})
    }catch(err){
        throw new Error(err);
    }
});

const updateCoupun = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    validMongoId(id)
    try{
        const updateCoupun = await Coupun.findByIdAndUpdate(id,req.body,{new:true});
        res.json({
            message:'Coupun updated',
            data:updateCoupun
        })
    }catch(err){
        throw new Error(err);
    }
});

const deleteCoupun = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    validMongoId(id)
    try{
        const deletedCoupun = await Coupun.findByIdAndDelete(id);
        res.json({
            message:'Coupun deleted',
            data:deletedCoupun
        })
    }catch(err){
        throw new Error(err);
    }
});

module.exports = { createCoupun, getAllCoupun, deleteCoupun, updateCoupun }