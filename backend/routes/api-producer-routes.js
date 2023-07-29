const express = require('express');
const router = express.Router();
const {sendError} = require('../util/sendError');
const verifyRoles = require('../util/verifyRoles');

const {
    addNewProducer,
    getAllProducers,
    getProducer,
    updateProducer,
    deleteProducer,
} = require('../database/actionsWithTables/producerActions');

const url = '/api/v1/producer';

router.post(url, verifyRoles(true), async (req, res) => {
    try {
        const data = await addNewProducer(req.body);
        res.status(201).send(data);
    } catch (error) {
        sendError(res, error);
    }
});

router.get(url, async (req, res) => {
    try {
        const producers = await getAllProducers();
        await res.send(producers);
    } catch (error) {
        sendError(res, error);
    }
});

router.get(`${url}/:id`, async (req, res) => {
    try {
        const producer = await getProducer(req.params.id);
        await res.send(producer);
    } catch (error) {
        sendError(res, error);
    }
});

router.patch(`${url}/:id`, verifyRoles(true), async (req, res) => {
    try {
        const producerInfo = await updateProducer(req.params.id, req.body);
        res.status(200).send(producerInfo);
    } catch (error) {
        sendError(res, error);
    }
});

router.delete(`${url}/:id`, verifyRoles(true), async (req, res) => {
    try {
        const producerId = await deleteProducer(req.params.id);
        res.status(200).send(producerId);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
