const express = require('express');
const router = express.Router();

const {
    addNewCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require('../database/actionsWithTables/categoryActions');

const url = '/api/v1/category'

router.post(url, async (req, res) => {
    try {
        const data = await addNewCategory(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.get(url, async (req, res) => {
    const categories = await getAllCategories();
    await res.send(categories);
});

router.get(`${url}/:id`, async (req, res) => {
    const category = await getCategory(req.params.id);
    await res.send(category);
});

router.patch(`${url}/:id`, async (req, res) => {
    try {
        const categoryInfo = await updateCategory(req.params.id, req.body);
        res.status(200).send(categoryInfo);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.delete(`${url}/:id`, async (req, res) => {
    const categoryId = await deleteCategory(req.params.id);
    res.status(200).send(categoryId);
});

module.exports = router;
