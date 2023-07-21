const express = require('express');
const router = express.Router();

const {
    addNewProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../database/actionsWithTables/productActions');

const url = '/api/v1/product'

router.post(url, async (req, res) => {
    try {
        const data = await addNewProduct(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({message: 'Bad value'});
    }
});

router.get(url, async (req, res) => {
    const products = await getAllProducts();
    await res.send(products);
});

router.get(`${url}/:id`, async (req, res) => {
    const product = await getProduct(req.params.id);
    await res.send(product);
});

router.patch(`${url}/:id`, async (req, res) => {
    try {
        const productInfo = await updateProduct(req.params.id, req.body);
        res.status(200).send(productInfo);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.delete(`${url}/:id`, async (req, res) => {
    const userId = await deleteProduct(req.params.id);
    res.status(200).send(userId);
  });

module.exports = router;
