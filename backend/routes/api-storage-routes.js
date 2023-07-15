const express = require('express');
const router = express.Router();

const {
    addNewStorage,
    returnStorages,
    isDeleteStorage,
} = require('../database/actionsWithTables/storageActions');

router.post('/api/storage', async (req, res) => {
    const data = await addNewStorage(req.body);
    res.status(201).send(data);
});

router.get('/api/storage', async (req, res) => {
    const storages = await returnStorages();
    await res.send(storages);
});

router.delete('/api/storage', async (req, res) => {
    const data = await isDeleteStorage(req.body);
    res.status(200).send(data)
});

module.exports = router;
