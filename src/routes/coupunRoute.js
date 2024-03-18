import { Router } from "express";
import { createCoupun, getAllCoupun, deleteCoupun, updateCoupun } from "../controller/coupunCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = Router();

router.post('/create', authMiddleware, isAdmin, createCoupun)
router.get('/getall', authMiddleware, getAllCoupun)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteCoupun)
router.put('/update/:id', authMiddleware, isAdmin, updateCoupun)

export default router;
