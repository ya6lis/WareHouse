const express = require('express');
const router = express.Router();

const {
    addNewProducer,
    getAllProducers,
    getProducer,
    updateProducer,
    deleteProducer,
} = require('../database/actionsWithTables/producerActions');

const url = '/api/v1/producer';

router.post(url, async (req, res) => {
    try {
        const data = await addNewProducer(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.get(url, async (req, res) => {
    try {
        const producers = await getAllProducers();
        await res.send(producers);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

router.get(`${url}/:id`, async (req, res) => {
    try {
        const producer = await getProducer(req.params.id);
        await res.send(producer);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
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
    try {
        const producerId = await deleteProducer(req.params.id);
        res.status(200).send(producerId);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

module.exports = router;
