const express = require('express');
const User = require('../models/user');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/',(req,res,next)=>{
    return res.json({message:'hello'});
});

router.post('/register',authController.userRegister);
router.post('/login',authController.userLogin);
module.exports = router;