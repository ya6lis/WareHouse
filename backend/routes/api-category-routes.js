const express = require('express');
const router = express.Router();

const {
    addNewCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require('../database/actionsWithTables/categoryActions');

const url = '/api/v1/category';

router.post(url, async (req, res) => {
    try {
        const data = await addNewCategory(req.body);
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
        const categories = await getAllCategories();
        await res.send(categories);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

router.get(`${url}/:id`, async (req, res) => {
    try {
        const category = await getCategory(req.params.id);
        await res.send(category);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

router.patch(`${url}/:id`, async (req, res) => {
    try {
        const categoryInfo = await updateCategory(req.params.id, req.body);
        res.status(200).send(categoryInfo);
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
        const categoryId = await deleteCategory(req.params.id);
        res.status(200).send(categoryId);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

module.exports = router;
