const express = require('express');
const router = express.Router();

const {
    addNewProductAmount,
    returnProductAmounts,
} = require('../database/actionsWithTables/productAmountActions');

router.post('/api/productAmount', async (req, res) => {
    try {
        const data = await addNewProductAmount(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'Bad value' });
    }
});

router.get('/api/productAmount', async (req, res) => {
    const productAmounts = await returnProductAmounts();
    await res.send(productAmounts);
});

module.exports = router;
