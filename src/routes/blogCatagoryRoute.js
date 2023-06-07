const express = require("express");
const { createCatagory, updateCatagory, deleteCatagory, getAllCatagory, getaCatagory } = require("../controller/blogCatagoryCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/',authMiddleware, isAdmin, createCatagory)
router.get('/get',authMiddleware, getAllCatagory)
router.get('/get/:id',authMiddleware, getaCatagory)
router.put('/update/:id',authMiddleware, isAdmin, updateCatagory)
router.delete('/delete/:id',authMiddleware, isAdmin, deleteCatagory)


module.exports = router;