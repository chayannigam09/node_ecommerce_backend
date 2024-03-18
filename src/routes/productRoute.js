import { Router } from 'express';
import { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImages } from '../controller/productCtrl.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { uploadPhoto, productImageResize } from '../middlewares/uploadImages.js';
const router = Router();

router.post('/',createProduct)
router.get('/:id',getaProduct)
router.get('/',getAllProduct)
router.put('/update/:id',authMiddleware,isAdmin,updateProduct)
router.put('/upload/:id',authMiddleware,isAdmin,uploadPhoto.array('images',10),productImageResize,uploadImages)
router.put('/wishlist',authMiddleware,addToWishlist)
router.put('/rating',authMiddleware,rating)
router.delete('/delete/:id',authMiddleware,isAdmin,deleteProduct)


export default router;
