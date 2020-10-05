const express = require('express');
const authController = require('../controllers/auth');
const profileController = require('../controllers/profile');
const requestController = require('../controllers/request');

const router = express.Router();

router.post('/request/new', requestController.makeRequest);
router.post('/request/accept', requestController.acceptReq);
router.get('/request', requestController.allReq);
module.exports = router;
