const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/jwtToken");
const validMongoId = require("../utils/validateMongodbId");
const generateRefreshToken = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const sendMail = require("./emailCtrl");
const crypto = require("crypto");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Coupun = require("../models/coupunModel");
const Order = require("../models/orderModel");
const uniqid = require('uniqid'); 
// Create a User
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json({
      msg: "User successfully registerd",
      data: newUser,
    });
  } else {
    // res.json({
    //     msg:"User Already Exist",
    //     success:false
    // });
    throw new Error("User Already Exists");
  }
});

// Login a User
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "Logged in Successfully",
      data: {
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
      },
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });
  if(findAdmin.role !== "admin") throw new Error("Not Authorised")
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "Logged in Successfully",
      data: {
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateToken(findAdmin?._id),
      },
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Get All Users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (err) {
    throw new Error(err);
  }
});

// Get a singl user
const getaUser = asyncHandler(async (req, res) => {
  validMongoId(req.params.id);
  try {
    const getUser = await User.findById(req.params.id);
    res.json({ data: getUser });
  } catch (err) {
    throw new Error(err);
  }
});

//Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    throw new Error(err);
  }
});

//Update a user
const updateUser = asyncHandler(async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
      },
      { new: true }
    );
    res.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    throw new Error(err);
  }
});

// Block User
const blockUser = asyncHandler(async (req, res) => {
  try {
    const block = await User.findByIdAndUpdate(
      req.params.id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.json({
      message: "User blocked",
      // data:block
    });
  } catch (err) {
    throw new Error(err);
  }
});

// unBlock User
const unblockUser = asyncHandler(async (req, res) => {
  try {
    const unblock = await User.findByIdAndUpdate(
      req.params.id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json({
      message: "User unBlocked",
      // data:unblock
    });
  } catch (err) {
    throw new Error(err);
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No refresh token in cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error("No refreshToken present in db or not matched");
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is somthing wrong with the token");
    }
    const accessToken = generateToken(user?.id);
    res.json(accessToken);
  });
  res.json(user);
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No refresh token in cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); //forbidden
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  console.log(req.user._id);
  validMongoId(_id);
  const user = await User.findById(_id);
  if (password) {
    // console.log(user,password,user.password);
    user.password = password;
    const updatedPassword = await user.save();
    res.json({ message: "Password Updated", data: updatedPassword });
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({ email });
    if(!user) throw new Error("User not found or email not exist")
    try{
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetUrl = `Hi please go to this link to reset your password, Link is valid for 10 minutes <a href="http://localhost:4000/api/user/reset-password/${token}">Click Here</a>`;
        const data={
            to:email,
            text:"hey User",
            subject:"Forgot Password Link",
            html:resetUrl
        }
        sendMail(data);
        res.json({
            message:'Reset link sent to mail, please check the mail'
        });
    }catch(err){
        throw new Error(err)
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const {password} = req.body;
    const {token} = req.params;
    const hashedToken =  crypto.createHash('sha256').update(token).digest("hex");
    const user = await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}});
    if(!user)  throw new Error('Token Expired Plese Try Again Later');
    user.password=password;
    user.passwordResetToken=undefined;
    user.passwordResetExpires=undefined;
    await user.save();
    res.json({
        message:'Password Reset Successfully',
        // data:user
    });
});

const getWishlist = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  try{
      const findUser = await User.findById(_id).populate("wishlist");
      res.json(findUser);
  }catch(err){
    throw new Error(err);
  }
});

const saveUserAddress = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  validMongoId(_id)
  try{
    const updateUserAddress = await User.findByIdAndUpdate(_id,{
      address:req?.body?.address
    },{
      new:true
    });
    res.json(updateUserAddress)
  }catch(err){
    throw new Error(err);
  }
});

const addToCart = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  const {cart} = req.body;
  validMongoId(_id)
  try{
    let products=[];
    const user = await User.findById(_id);
    const cartExist = await Cart.findOne({orderBy:user._id});
    if(cartExist){
      cartExist.remove();
    }
    for(let i=0;i<cart.length;i++){
      let obj = {};
      obj.product = cart[i]._id;
      obj.count = cart[i].count;
      obj.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      obj.price = getPrice.price;
      products.push(obj);
    }
    let cartTotal = 0;
    for(let i=0; i<products.length; i++) {
      cartTotal+=products[i].price*products[i].count;
    }
    let newCart = await new Cart({
      products,cartTotal,orderBy:user._id
    }).save();
    res.json(newCart)
  }catch(err){
    throw new Error(err);
  }
});

const getUserCart = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  validMongoId(_id)
  try{
    const getCart = await Cart.findOne({orderBy:_id}).populate("products.product");
    res.json(getCart)
  }catch(err){
    throw new Error(err);
  }
});

const emptyCart = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  validMongoId(_id)
  try{
    // const user = await User.findOne({_id});
    const cart = await Cart.findOneAndRemove({orderBy:_id});
    res.json("cart empty")
  }catch(err){
    throw new Error(err);
  }
});

const applyCoupun = asyncHandler(async(req,res)=>{
  const {coupon} = req.body;
  const {_id} = req.user;
  // validMongoId(_id)
  try{
    const validCoupon = await Coupun.findOne({name:coupon});
    if(validCoupon==null) throw new Error("Invalid Coupon")
    let {products,cartTotal} = await Cart.findOne({orderBy:_id});
    let totalAfterDiscount = (cartTotal-(cartTotal*validCoupon.discount)/100).toFixed(2)
    const cartval = await Cart.findOneAndUpdate({orderBy:_id},{totalAfterDiscount},{new:true});
    res.json(cartval)
  }catch(err){
    throw new Error(err);
  }
});

const createOrder = asyncHandler(async(req,res)=>{
  const {COD,couponApplied} = req.body;
  const {_id} = req.user;
  validMongoId(_id)
  try{
    if(!COD) throw new Error("Error");
    let userCart = await Cart.findOne({orderBy:_id});
    let finalAmt = 0;
    if(couponApplied && userCart.totalAfterDiscount){
      finalAmt = userCart.totalAfterDiscount*100;
    }else{
      finalAmt =userCart.cartTotal;
    }
    let newOrder = await new Order({
      products:userCart.products,
      paymentIntent:{
        id:uniqid(),
        method:"COD",
        amount:finalAmt,
        status:"Cash on Delivery",
        created:Date.now(),
        currency:"USD",
      },
      orderBy:_id,
      orderStatus:"Cash on Delivery",
    }).save();
    let update = userCart.products.map((item)=>{
      return{
        updateOne:{
          filter:{_id: item.product._id},
          update:{$inc:{quantity:-item.count,sold:+item.count}}
        },
      };
    });
    const updated = await Product.bulkWrite(update,{});
    res.json({message:"success"})
  }catch(err){
    throw new Error(err);
  }
});

const getUserOrder = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  validMongoId(_id)
  try{
    const order = await Order.findOne({orderBy:_id}).populate("products.product");
    res.json({order})
  }catch(err){
    throw new Error(err);
  }
});

const updateOrderStatus = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  const {status} = req.body;
  try{
    const updatedOrderStatus = await Order.findByIdAndUpdate(id,{orderStatus:status,
    paymentIntent:{
      status:status
    }
    },{new:true});
    res.json({updatedOrderStatus})
  }catch(err){
    throw new Error(err);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getAllUser,
  getaUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveUserAddress,
  addToCart,
  getUserCart,
  emptyCart,
  applyCoupun,
  createOrder,
  getUserOrder,
  updateOrderStatus
};
