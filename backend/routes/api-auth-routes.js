const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const url = '/api/v1/auth';

router.post(url, authController.handleLogin);

module.exports = router;
