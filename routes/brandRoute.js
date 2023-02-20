const express = require("express");
const { createBrand, updateBrand, deleteBrand, getAllBrand, getaBrand } = require("../controller/brandCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/',authMiddleware, isAdmin, createBrand)
router.get('/get',authMiddleware, getAllBrand)
router.get('/get/:id',authMiddleware, getaBrand)
router.put('/update/:id',authMiddleware, isAdmin, updateBrand)
router.delete('/delete/:id',authMiddleware, isAdmin, deleteBrand)


module.exports = router;