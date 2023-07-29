const express = require('express');
const router = express.Router();

const logoutController = require('../controllers/logoutController');

const url = '/api/v1/logout';

router.get(url, logoutController.handleLogout);

module.exports = router;
