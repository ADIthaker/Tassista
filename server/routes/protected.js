const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/userinfo', authController.getUser);

module.exports = router;