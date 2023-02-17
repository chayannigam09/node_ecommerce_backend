const express = require('express');
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct } = require('../controller/productCtrl');
const { authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/',createProduct)
router.get('/:id',getaProduct)
router.get('/',getAllProduct)
router.put('/update/:id',authMiddleware,isAdmin,updateProduct)
router.delete('/delete/:id',authMiddleware,isAdmin,deleteProduct)


module.exports = router;
