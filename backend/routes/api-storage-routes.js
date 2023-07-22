const express = require('express');
const router = express.Router();

const {
    addNewStorage,
    getAllStorages,
    getStorage,
    updateStorage,
    deleteStorage,
} = require('../database/actionsWithTables/storageActions');

const url = '/api/v1/storage';

router.post(url, async (req, res) => {
    try {
        const data = await addNewStorage(req.body);
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
        const storages = await getAllStorages();
        await res.send(storages);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

router.get(`${url}/:id`, async (req, res) => {
    try {
        const storage = await getStorage(req.params.id);
        await res.send(storage);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

router.patch(`${url}/:id`, async (req, res) => {
    try {
        const storageInfo = await updateStorage(req.params.id, req.body);
        res.status(200).send(storageInfo);
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
        const storageId = await deleteStorage(req.params.id);
        res.status(200).send(storageId);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

module.exports = router;
