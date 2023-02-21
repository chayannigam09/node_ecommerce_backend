const express = require('express');
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImages } = require('../controller/productCtrl');
const { authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const { uploadPhoto, productImageResize } = require('../middlewares/uploadImages');
const router = express.Router();

router.post('/',createProduct)
router.get('/:id',getaProduct)
router.get('/',getAllProduct)
router.put('/update/:id',authMiddleware,isAdmin,updateProduct)
router.put('/upload/:id',authMiddleware,isAdmin,uploadPhoto.array('images',10),productImageResize,uploadImages)
router.put('/wishlist',authMiddleware,addToWishlist)
router.put('/rating',authMiddleware,rating)
router.delete('/delete/:id',authMiddleware,isAdmin,deleteProduct)


module.exports = router;
