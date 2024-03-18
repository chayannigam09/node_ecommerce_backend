import User from '../models/userModel.js';
import { verify } from 'jsonwebtoken';
import asyncHandler from "express-async-handler";

export const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = verify(token,process.env.JWT_SECRET);
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

export const isAdmin = asyncHandler(async(req,res,next)=>{
    const {email} = req.user;
    const admin = await User.findOne({email});
    if(admin.role !== "admin"){
        throw new Error('User is not admin');
    }else{
        next();
    }
})
// export default {authMiddleware, isAdmin}