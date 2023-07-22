const express = require('express');
const router = express.Router();

const {
    addNewProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../database/actionsWithTables/productActions');

const url = '/api/v1/product';

router.post(url, async (req, res) => {
    try {
        const data = await addNewProduct(req.body);
        res.status(201).send(data);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send({ message: 'The name already exists!' });
        } else {
            res.status(404).send({ message: 'Not found!' });
        }
    }
});

router.get(url, async (req, res) => {
    try {
        const products = await getAllProducts();
        await res.send(products);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

router.get(`${url}/:id`, async (req, res) => {
    try {
        const product = await getProduct(req.params.id);
        await res.send(product);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

router.patch(`${url}/:id`, async (req, res) => {
    try {
        const productInfo = await updateProduct(req.params.id, req.body);
        res.status(200).send(productInfo);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send({ message: 'The name already exists!' });
        } else {
            res.status(404).send({ message: 'Not found!' });
        }
    }
});

router.delete(`${url}/:id`, async (req, res) => {
    try {
        const userId = await deleteProduct(req.params.id);
        res.status(200).send(userId);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

module.exports = router;
