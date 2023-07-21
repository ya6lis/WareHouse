const express = require('express');
const router = express.Router();

const {
    addNewStorage,
    getAllStorages,
    getStorage,
    updateStorage,
    deleteStorage,
} = require('../database/actionsWithTables/storageActions');

const url = '/api/v1/storage'

router.post(url, async (req, res) => {
    try {
        const data = await addNewStorage(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.get(url, async (req, res) => {
    const storages = await getAllStorages();
    await res.send(storages);
});

router.get(`${url}/:id`, async (req, res) => {
    const storage = await getStorage(req.params.id);
    await res.send(storage);
});

router.patch(`${url}/:id`, async (req, res) => {
    try {
        const storageInfo = await updateStorage(req.params.id, req.body);
        res.status(200).send(storageInfo);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.delete(`${url}/:id`, async (req, res) => {
    const storageId = await deleteStorage(req.params.id);
    res.status(200).send(storageId);
});

module.exports = router;
