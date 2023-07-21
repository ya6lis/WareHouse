const express = require('express');
const router = express.Router();

const {
    addNewProductAmount,
    returnProductAmounts,
} = require('../database/actionsWithTables/productAmountActions');

const url = '/api/v1/productAmount'

router.post(url, async (req, res) => {
    try {
        const data = await addNewProductAmount(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'Bad value' });
    }
});

router.get(url, async (req, res) => {
    const productAmounts = await returnProductAmounts();
    await res.send(productAmounts);
});

module.exports = router;
