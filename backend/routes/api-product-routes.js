const express = require('express');
const router = express.Router();

const {
    addNewProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} = require('../database/actionsWithTables/productActions');

router.post('/api/product', async (req, res) => {
    try {
        const data = await addNewProduct(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({message: 'Bad value'});
    }
});

router.get('/api/product', async (req, res) => {
    const products = await getAllProducts();
    await res.send(products);
});

router.patch('/api/product/:id', async (req, res) => {
    try {
        const productInfo = await updateProduct(req.params.id, req.body);
        res.status(200).send(productInfo);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.delete('/api/product/:id', async (req, res) => {
    const userId = await deleteProduct(req.params.id);
    res.status(200).send(userId);
  });

module.exports = router;
