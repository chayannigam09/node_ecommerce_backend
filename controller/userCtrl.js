const User = require('../models/userModel');
const asyncHandler = require("express-async-handler")
const generateToken = require('../config/jwtToken');
const validMongoId = require('../utils/validateMongodbId');
const generateRefreshToken = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
const { response } = require('express');
// Create a User
const createUser = asyncHandler(async (req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser){
        const newUser = await User.create(req.body);
        res.json({
            msg:"User successfully registerd",
            data:newUser
        });
    }else{
        // res.json({
        //     msg:"User Already Exist",
        //     success:false
        // });
        throw new Error('User Already Exists');
    }
});

// Login a User
const loginUserCtrl = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    const findUser = await User.findOne({email});
    if(findUser && await findUser.isPasswordMatched(password)){
        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateUser = await User.findByIdAndUpdate(findUser.id,{
            refreshToken: refreshToken
        },{new:true});
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge:24*60*60*1000,
        })
        res.json({
            message:"Logged in Successfully",
            data:{
                firstname:findUser?.firstname,
                lastname:findUser?.lastname,
                email:findUser?.email,
                mobile:findUser?.mobile,
                token:generateToken(findUser?._id)
            }
        })
    }else{
        throw new Error("Invalid Credentials");
    }
})

// Get All Users
const getAllUser = asyncHandler(async(req,res)=>{
    try{
        const getUsers = await User.find();
        res.json(getUsers)
    }catch(err){
        throw new Error(err);
    }
})

// Get a singl user
const getaUser = asyncHandler(async(req,res)=>{
    validMongoId(req.params.id)
    try{
        const getUser = await User.findById(req.params.id);
        res.json({data:getUser})
    }catch(err){
        throw new Error(err);
    }
})

//Delete a user
const deleteUser = asyncHandler(async(req,res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json({
            message:"User deleted successfully",
            data:deletedUser
        })
    }catch(err){
        throw new Error(err);
    }
})

//Update a user
const updateUser = asyncHandler(async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.user._id,{
            firstname:req?.body?.firstname,
            lastname:req?.body?.lastname,
        },{new:true})
        res.json({
            message:"User updated successfully",
            data:updatedUser
        })
    }catch(err){
        throw new Error(err);
    }
})

// Block User
const blockUser = asyncHandler(async(req,res)=>{
    try{
        const block = await User.findByIdAndUpdate(req.params.id,{
            isBlocked:true
        },{new:true})
        res.json({
            message:"User blocked",
            // data:block
        })
    }catch(err){
        throw new Error(err);
    }
})

// unBlock User
const unblockUser = asyncHandler(async(req,res)=>{
    try{
        const unblock = await User.findByIdAndUpdate(req.params.id,{
            isBlocked:false
        },{new:true})
        res.json({
            message:"User unBlocked",
            // data:unblock
        })
    }catch(err){
        throw new Error(err);
    }
})

const handleRefreshToken = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.refreshToken){
        throw new Error('No refresh token in cookies');
    }
        const refreshToken = cookie.refreshToken;
        const user = await User.findOne({refreshToken});
        if(!user){throw new Error('No refreshToken present in db or not matched')}
        jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded) =>{
            if(err || user.id !== decoded.id){
                throw new Error('There is somthing wrong with the token')
            }
            const accessToken = generateToken(user?.id);
            res.json(accessToken);
        })
        res.json(user)
})

const logout = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.refreshToken){throw new Error('No refresh token in cookies');}
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user){
        res.clearCookie("refreshToken",{
            httpOnly:true,secure:true
        });
        return res.sendStatus(204); //forbidden
    }
    await User.findOneAndUpdate(refreshToken,{
        refreshToken:""
    });
    res.clearCookie("refreshToken",{
        httpOnly:true,secure:true
    });
    res.sendStatus(204); //forbidden
});

const updatePassword = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {password} = req.body;
    console.log(req.user._id);
    validMongoId(_id);
    const user = await User.findById(_id);
    if(password){
        // console.log(user,password,user.password);
        user.password = password;
        const updatedPassword = await user.save();
        res.json({message:"Password Updated",data:updatedPassword})
    }else{
        res.json(user)
    }
});

module.exports = {createUser, loginUserCtrl, getAllUser, getaUser, deleteUser, updateUser,blockUser,unblockUser,handleRefreshToken, logout,updatePassword};