const express = require("express");
const { createBlog, updateBlog, getaBlog, getAllBlogs, deleteBlog, likeBlog,disLikeBlog, uploadImages } = require("../controller/blogCtrl");
const { authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const { uploadPhoto, blogsImageResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createBlog)
router.get('/',getAllBlogs)
router.get('/:id',getaBlog)
router.put('/update/:id',authMiddleware,isAdmin,updateBlog)
router.put('/upload/:id',authMiddleware,isAdmin,uploadPhoto.array('images',10),blogsImageResize,uploadImages)
router.delete('/delete/:id',authMiddleware,isAdmin,deleteBlog)
router.put('/like',authMiddleware,isAdmin,likeBlog)
router.put('/dislike',authMiddleware,isAdmin,disLikeBlog)


module.exports = router;
