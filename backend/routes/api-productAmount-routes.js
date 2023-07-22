const express = require('express');
const router = express.Router();

const {
    addNewProductAmount,
    returnProductAmounts,
} = require('../database/actionsWithTables/productAmountActions');

const url = '/api/v1/productAmount';

router.post(url, async (req, res) => {
    try {
        const data = await addNewProductAmount(req.body);
        res.status(201).send(data);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send({ message: 'Bad value!' });
        } else {
            res.status(404).send({ message: 'Not found!' });
        }
    }
});

router.get(url, async (req, res) => {
    try {
        const productAmounts = await returnProductAmounts();
        await res.send(productAmounts);
    } catch (error) {
        res.status(404).send({ message: 'Not found!' });
    }
});

module.exports = router;
