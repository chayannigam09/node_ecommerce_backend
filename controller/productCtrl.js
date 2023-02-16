const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

//create products
const createProduct = asyncHandler(async(req,res)=>{
    try{
        if(req.body.title){req.body.slug = slugify(req.body.title)}
        const newProduct = await Product.create(req.body);
        res.json({
            message:'Product added',
            data:newProduct
        })
    }catch(err){
        throw new Error(err);
    }
});

//Get products by id
const getaProduct = asyncHandler(async(req,res)=>{
    try{
        const findProduct = await Product.findById(req.params.id);
        res.json({
            // message:'hello product',
            data:findProduct
        })
    }catch(err){
        throw new Error(err);
    }
});

//Get all products
const getAllProduct = asyncHandler(async(req,res)=>{
    try{
        //Filtering
        const queryObj = {...req.query}
        const excludeFields = ["page","sort","limit","fields"];
        excludeFields.forEach((el)=>delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=> `$${match}`)
        let query = Product.find(JSON.parse(queryStr));

        //Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy)
        }else{
            query = query.sort("-createdAt");
        }

        //Limiting the fields
        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields)
        }else{
            query = query.select("-__v");
        }

        //Pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page-1)*limit;
        query = query.skip(skip).limit(limit)
        if(req.query.page){
            const productCount = await Product.countDocuments();
            if(skip>=productCount)throw new Error('page not exist')
        }
        const allProduct = await query;
        //Product.find({brand:req.query.brand,catagory:req.query.catagory})
        //Product.where("catagory").equals(req.query.catagory);
        res.json(allProduct)
    }catch(err){
        throw new Error(err);
    }
});

//update product
const updateProduct = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    try{
        if(req.body.title){req.body.slug = slugify(req.body.title)}
        const updateProduct = await Product.findOneAndUpdate(id,req.body,{new:true});
        res.json({
            message:'Product updated',
            data:updateProduct
        })
    }catch(err){
        throw new Error(err);
    }
});

//delete product
const deleteProduct = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    try{
        if(req.body.title){req.body.slug = slugify(req.body.title)}
        const deletedProduct = await Product.findOneAndDelete(id);
        res.json({
            message:'Product deleted',
            data:deletedProduct
        })
    }catch(err){
        throw new Error(err);
    }
});

module.exports = {createProduct,getaProduct,getAllProduct,updateProduct,deleteProduct};