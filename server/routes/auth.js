const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({ message: 'hello' });
});

router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.get('/logout', authController.userLogout);
module.exports = router;
