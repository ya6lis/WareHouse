const express = require('express');
const router = express.Router();

const {
    addNewStorage,
    getAllStorages,
    deleteStorage,
} = require('../database/actionsWithTables/storageActions');

router.post('/api/storage', async (req, res) => {
    try {
        const data = await addNewStorage(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.get('/api/storage', async (req, res) => {
    const storages = await getAllStorages();
    await res.send(storages);
});

router.delete('/api/storage/:id', async (req, res) => {
    const storageId = await deleteStorage(req.params.id);
    res.status(200).send(storageId);
});

module.exports = router;
