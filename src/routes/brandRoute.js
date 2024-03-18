import { Router } from "express";
import { createBrand, updateBrand, deleteBrand, getAllBrand, getaBrand } from "../controller/brandCtrl.js";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";
const router = Router();

router.post('/',authMiddleware, isAdmin, createBrand)
router.get('/get',authMiddleware, getAllBrand)
router.get('/get/:id',authMiddleware, getaBrand)
router.put('/update/:id',authMiddleware, isAdmin, updateBrand)
router.delete('/delete/:id',authMiddleware, isAdmin, deleteBrand)


export default router;