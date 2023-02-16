const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                const user = await User.findById(decoded.id);
                req.user=user;
                next();
            }
        }catch(err){
            throw new Error("Invalid Token");
        }
    }else{
        throw new Error("Token is not in header");
    }
})

const isAdmin = asyncHandler(async(req,res,next)=>{
    const {email} = req.user;
    const admin = await User.findOne({email});
    if(admin.role !== "admin"){
        throw new Error('User is not admin');
    }else{
        next();
    }
})
module.exports = {authMiddleware, isAdmin}