const express = require('express');
const router = express.Router();

const {
    addNewProduct,
    returnProducts,
    isDeleteProduct,
} = require('../database/actionsWithTables/productActions');

const {
    returnSubcategorys,
} = require('../database/actionsWithTables/subcategoryActions');
const {
    returnProducer,
} = require('../database/actionsWithTables/producerActions');

router.post('/api/product', async (req, res) => {
    const data = await addNewProduct(req.body);
    res.status(201).send(data);
});

router.get('/api/product', async (req, res) => {
    const products = await returnProducts();
    const subcategorys = await returnSubcategorys();
    const producers = await returnProducer();
    await res.send([products, subcategorys, producers]);
});

router.delete('/api/product', async (req, res) => {
    const data = await isDeleteProduct(req.body);
    res.status(200).send(data)
});

module.exports = router;
