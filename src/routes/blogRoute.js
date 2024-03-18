import { Router } from "express";
import { createBlog, updateBlog, getaBlog, getAllBlogs, deleteBlog, likeBlog, disLikeBlog, uploadImages } from "../controller/blogCtrl.js";
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { uploadPhoto, blogsImageResize } from "../middlewares/uploadImages.js";
const router = Router();

router.post('/',authMiddleware,isAdmin,createBlog)
router.get('/',getAllBlogs)
router.get('/:id',getaBlog)
router.put('/update/:id',authMiddleware,isAdmin,updateBlog)
router.put('/upload/:id',authMiddleware,isAdmin,uploadPhoto.array('images',10),blogsImageResize,uploadImages)
router.delete('/delete/:id',authMiddleware,isAdmin,deleteBlog)
router.put('/like',authMiddleware,isAdmin,likeBlog)
router.put('/dislike',authMiddleware,isAdmin,disLikeBlog)


export default router;
