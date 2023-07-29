const express = require('express');
const router = express.Router();
const {sendError} = require('../util/sendError');
const verifyRoles = require('../util/verifyRoles');

const {
    addNewProductAmount,
    returnProductAmounts,
} = require('../database/actionsWithTables/productAmountActions');

const url = '/api/v1/productAmount';

router.post(url, verifyRoles(true), async (req, res) => {
    try {
        const data = await addNewProductAmount(req.body);
        res.status(201).send(data);
    } catch (error) {
        sendError(res, error);
    }
});

router.get(url, async (req, res) => {
    try {
        const productAmounts = await returnProductAmounts();
        await res.send(productAmounts);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
