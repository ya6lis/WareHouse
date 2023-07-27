const express = require('express');
const router = express.Router();
const {sendError} = require('../util/sendError');
const verifyRoles = require('../util/verifyRoles');

const {
    addNewSubcategory,
    getAllSubcategories,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory,
} = require('../database/actionsWithTables/subcategoryActions');

const url = '/api/v1/subcategory';

router.post(url, verifyRoles(true), async (req, res) => {
    try {
        const data = await addNewSubcategory(req.body);
        res.status(201).send(data);
    } catch (error) {
        sendError(res, error);
    }
});

router.get(url, async (req, res) => {
    try {
        const subcategories = await getAllSubcategories();
        await res.send(subcategories);
    } catch (error) {
        sendError(res, error);
    }
});

router.get(`${url}/:id`, async (req, res) => {
    try {
        const subcategory = await getSubcategory(req.params.id);
        await res.send(subcategory);
    } catch (error) {
        sendError(res, error);
    }
});

router.patch(`${url}/:id`, verifyRoles(true), async (req, res) => {
    try {
        const subcategoryInfo = await updateSubcategory(
            req.params.id,
            req.body
        );
        res.status(200).send(subcategoryInfo);
    } catch (error) {
        sendError(res, error);
    }
});

router.delete(`${url}/:id`, verifyRoles(true), async (req, res) => {
    try {
        const subcategoryId = await deleteSubcategory(req.params.id);
        res.status(200).send(subcategoryId);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
