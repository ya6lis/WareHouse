const express = require('express');
const router = express.Router();
const {sendError} = require('../util/sendError');
const verifyRoles = require('../util/verifyRoles');

const {
    addNewCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require('../database/actionsWithTables/categoryActions');

const url = '/api/v1/category';

router.post(url, verifyRoles(true), async (req, res) => {
    try {
        const data = await addNewCategory(req.body);
        res.status(201).send(data);
    } catch (error) {
        sendError(res, error);
    }
});

router.get(url, async (req, res) => {
    try {
        const categories = await getAllCategories();
        await res.send(categories);
    } catch (error) {
        sendError(res, error);
    }
});

router.get(`${url}/:id`, async (req, res) => {
    try {
        const category = await getCategory(req.params.id);
        await res.send(category);
    } catch (error) {
        sendError(res, error);
    }
});

router.patch(`${url}/:id`, verifyRoles(true), async (req, res) => {
    try {
        const categoryInfo = await updateCategory(req.params.id, req.body);
        res.status(200).send(categoryInfo);
    } catch (error) {
        sendError(res, error);
    }
});

router.delete(`${url}/:id`, verifyRoles(true), async (req, res) => {
    try {
        const categoryId = await deleteCategory(req.params.id);
        res.status(200).send(categoryId);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
