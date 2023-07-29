const express = require('express');
const router = express.Router();
const {sendError} = require('../util/sendError');
const verifyRoles = require('../util/verifyRoles');

const {
    addNewProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../database/actionsWithTables/productActions');

const url = '/api/v1/product';

router.post(url, verifyRoles(true), async (req, res) => {
    try {
        const data = await addNewProduct(req.body);
        res.status(201).send(data);
    } catch (error) {
        sendError(res, error);
    }
});

router.get(url, async (req, res) => {
    try {
        const products = await getAllProducts();
        await res.send(products);
    } catch (error) {
        sendError(res, error);
    }
});

router.get(`${url}/:id`, async (req, res) => {
    try {
        const product = await getProduct(req.params.id);
        await res.send(product);
    } catch (error) {
        sendError(res, error);
    }
});

router.patch(`${url}/:id`, verifyRoles(true), async (req, res) => {
    try {
        const productInfo = await updateProduct(req.params.id, req.body);
        res.status(200).send(productInfo);
    } catch (error) {
        sendError(res, error);
    }
});

router.delete(`${url}/:id`, verifyRoles(true), async (req, res) => {
    try {
        const userId = await deleteProduct(req.params.id);
        res.status(200).send(userId);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
