const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController');

const url = '/api/v1/register';

router.post(url, registerController.handleNewUser);

module.exports = router;
