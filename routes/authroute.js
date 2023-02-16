const express = require('express');
const { createUser, loginUserCtrl, getAllUser,getaUser, deleteUser, updateUser,blockUser,unblockUser, handleRefreshToken, logout,updatePassword } = require('../controller/userCtrl');
const { authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register',createUser)
router.post('/login',loginUserCtrl)
router.put('/password',authMiddleware,updatePassword)
router.get('/all-users',authMiddleware,getAllUser)
router.get('/refresh',handleRefreshToken)
router.get('/logout',logout)
router.get('/:id',authMiddleware,isAdmin,getaUser)
router.delete('/delete/:id',authMiddleware,isAdmin,deleteUser)
router.put('/update',authMiddleware,isAdmin,updateUser)
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser)
router.put('/unblock-user/:id',authMiddleware,isAdmin,unblockUser)

module.exports = router;