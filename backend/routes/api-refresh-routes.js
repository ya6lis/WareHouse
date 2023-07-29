const express = require('express');
const router = express.Router();

const refreshTokenController = require('../controllers/refreshTokenController');

const url = '/api/v1/refresh';

router.get(url, refreshTokenController.handleRefreshToken);

module.exports = router;
