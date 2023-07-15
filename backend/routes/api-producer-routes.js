const express = require('express');
const router = express.Router();

const {
    addNewProducer,
    returnProducer,
    isDeleteProducer,
} = require('../database/actionsWithTables/producerActions');

router.post('/api/producer', async (req, res) => {
    const data = await addNewProducer(req.body);
    res.status(201).send(data);
});

router.get('/api/producer', async (req, res) => {
    const producers = await returnProducer();
    await res.send(producers);
});

router.delete('/api/producer', async (req, res) => {
    const data = await isDeleteProducer(req.body);
    res.status(200).send(data)
});

module.exports = router;
