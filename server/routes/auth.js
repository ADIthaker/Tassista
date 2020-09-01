const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({ message: 'hello' });
});

router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.get('/logout', authController.userLogout);
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);
router.get('/google/redirect', passport.authenticate('google'), (req, res) =>
    res.json({ message: 'Authenticated' }),
);

module.exports = router;
