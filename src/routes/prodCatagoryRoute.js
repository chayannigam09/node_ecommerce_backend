import { Router } from "express";
import { createCatagory, updateCatagory, deleteCatagory, getAllCatagory, getaCatagory } from "../controller/prodCatagoryCtrl.js";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";
const router = Router();

router.post('/',authMiddleware, isAdmin, createCatagory)
router.get('/get',authMiddleware, getAllCatagory)
router.get('/get/:id',authMiddleware, getaCatagory)
router.put('/update/:id',authMiddleware, isAdmin, updateCatagory)
router.delete('/delete/:id',authMiddleware, isAdmin, deleteCatagory)


export default router;