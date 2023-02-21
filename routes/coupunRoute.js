const express = require("express");
const { createCoupun, getAllCoupun, deleteCoupun, updateCoupun } = require("../controller/coupunCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/create', authMiddleware, isAdmin, createCoupun)
router.get('/getall', authMiddleware, getAllCoupun)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteCoupun)
router.put('/update/:id', authMiddleware, isAdmin, updateCoupun)

module.exports = router;
