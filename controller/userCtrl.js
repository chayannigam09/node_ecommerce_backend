const User = require('../models/userModel');
const asyncHandler = require("express-async-handler")
const generateToken = require('../config/jwtToken');

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
    try{
        const getUser = await User.findById(req.params.id);
        res.json(getUser)
    }catch(err){
        throw new Error(err);
    }
})

module.exports = {createUser, loginUserCtrl, getAllUser, getaUser};