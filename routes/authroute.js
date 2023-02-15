const express = require('express');
const { createUser, loginUserCtrl, getAllUser,getaUser } = require('../controller/userCtrl');
const router = express.Router();

router.post('/register',createUser)
router.post('/login',loginUserCtrl)
router.get('/all-users',getAllUser)
router.get('/:id',getaUser)

module.exports = router;