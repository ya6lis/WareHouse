const express = require('express');
const router = express.Router();

const {
    addNewProducer,
    getAllProducer,
    deleteProducer,
} = require('../database/actionsWithTables/producerActions');

router.post('/api/producer', async (req, res) => {
    try {
        const data = await addNewProducer(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.get('/api/producer', async (req, res) => {
    const producers = await getAllProducer();
    await res.send(producers);
});

router.delete('/api/producer', async (req, res) => {
    const data = await deleteProducer(req.body);
    res.status(200).send(data);
});

module.exports = router;
