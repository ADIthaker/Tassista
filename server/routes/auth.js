const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({ message: 'hello' });
});

router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.post('/driver/login', authController.driverLogin);
router.post('/driver/register', authController.driverRegister);
router.get('/logout', authController.userLogout);
router.get(
    '/google',
    passport.authenticate('user', {
        scope: ['profile', 'email'],
    }),
);
router.get(
    '/driver/google',
    passport.authenticate('driver', {
        scope: ['profile', 'email'],
    }),
);

router.get('/google/user/redirect', passport.authenticate('user'), (req, res) =>
    res.redirect('http://localhost:3000/'),
);
router.get(
    '/google/driver/redirect',
    passport.authenticate('driver'),
    (req, res) => res.redirect('http://localhost:3000/'),
);
router.get('/requser', (req, res) => res.send(req.user));

module.exports = router;
