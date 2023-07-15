const express = require('express');
const router = express.Router();

const {
    addNewProductAmount,
    returnProductAmounts,
} = require('../database/actionsWithTables/productAmountActions');

const {
    returnStorages,
} = require('../database/actionsWithTables/storageActions');
const {
    returnProducts,
} = require('../database/actionsWithTables/productActions');

router.post('/api/productAmount', async (req, res) => {
    const data = await addNewProductAmount(req.body);
    res.status(201).send(data);
});

router.get('/api/productAmount', async (req, res) => {
    const productAmounts = await returnProductAmounts();
    const storages = await returnStorages();
    const products = await returnProducts();
    await res.send([productAmounts, storages, products]);
});

module.exports = router;
