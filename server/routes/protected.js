const express = require('express');
const authController = require('../controllers/auth');
const profileController = require('../controllers/profile');

const router = express.Router();

router.get('/userinfo', authController.getUser);
router.post('/user/profile/update', profileController.changeUserProfile);
router.post('/driver/profile/update', profileController.changeDriverProfile);

module.exports = router;
