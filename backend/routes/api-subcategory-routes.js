const express = require('express');
const router = express.Router();

const {
    addNewSubcategory,
    getAllSubcategories,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory,
} = require('../database/actionsWithTables/subcategoryActions');

const url = '/api/v1/subcategory';

router.post(url, async (req, res) => {
    try {
        const data = await addNewSubcategory(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.get(url, async (req, res) => {
    try {
        const subcategories = await getAllSubcategories();
        await res.send(subcategories);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

router.get(`${url}/:id`, async (req, res) => {
    try {
        const subcategory = await getSubcategory(req.params.id);
        await res.send(subcategory);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

router.patch(`${url}/:id`, async (req, res) => {
    try {
        const subcategoryInfo = await updateSubcategory(
            req.params.id,
            req.body
        );
        res.status(200).send(subcategoryInfo);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.delete(`${url}/:id`, async (req, res) => {
    try {
        const subcategoryId = await deleteSubcategory(req.params.id);
        res.status(200).send(subcategoryId);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

module.exports = router;
