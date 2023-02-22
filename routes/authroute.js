const express = require("express");
const {
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
  getUserOrder,updateOrderStatus
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.put("/password", authMiddleware, updatePassword);
router.get("/all-users", authMiddleware, getAllUser);
router.post("/cart", authMiddleware, addToCart);
router.post("/create-order", authMiddleware, createOrder);
router.post("/cart/applycoupun", authMiddleware, applyCoupun);
router.get("/get-cart", authMiddleware, getUserCart);
router.get("/refresh", handleRefreshToken);
router.get("/get-order",authMiddleware, getUserOrder);
router.get("/getwishlist", authMiddleware, getWishlist);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteUser);
router.put("/update", authMiddleware, isAdmin, updateUser);
router.put("/saveaddress", authMiddleware, saveUserAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/update-order/:id", authMiddleware, isAdmin, updateOrderStatus);

module.exports = router;
