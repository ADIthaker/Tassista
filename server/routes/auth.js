const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth');
const { isAuth, isAlreadyLoggedIn } = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({ message: 'hello' });
});

router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.get('/logout', authController.userLogout);
router.get(
    '/google',
    isAlreadyLoggedIn,
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);
// router.get('/user', authController.getUser);
router.get('/profile', authController.getUser);
router.get('/google/redirect', passport.authenticate('google'), (req, res) =>
    res.redirect('http://localhost:3000'),
);

module.exports = router;
