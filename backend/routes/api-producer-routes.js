const express = require('express');
const router = express.Router();

const {
    addNewProducer,
    getAllProducers,
    getProducer,
    updateProducer,
    deleteProducer,
} = require('../database/actionsWithTables/producerActions');

const url = '/api/v1/producer'

router.post(url, async (req, res) => {
    try {
        const data = await addNewProducer(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.get(url, async (req, res) => {
    const producers = await getAllProducers();
    await res.send(producers);
});

router.get(`${url}/:id`, async (req, res) => {
    const producer = await getProducer(req.params.id);
    await res.send(producer);
});

router.patch(`${url}/:id`, async (req, res) => {
    try {
        const producerInfo = await updateProducer(req.params.id, req.body);
        res.status(200).send(producerInfo);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.delete(`${url}/:id`, async (req, res) => {
    const producerId = await deleteProducer(req.params.id);
    res.status(200).send(producerId);
});

module.exports = router;
