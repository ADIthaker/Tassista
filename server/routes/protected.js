const express = require('express');
const authController = require('../controllers/auth');
const profileController = require('../controllers/profile');

const router = express.Router();

router.get('/userinfo', authController.getUser);
router.post(
    '/user/profile/update',
    profileController.setUser,
    profileController.changeUserProfile,
);
router.post(
    '/driver/profile/update',
    profileController.setUser,
    profileController.changeDriverProfile,
);

module.exports = router;
