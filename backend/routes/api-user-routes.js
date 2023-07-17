const express = require('express');
const router = express.Router();

const {
    addNewUser,
    getAllUsers,
    deleteUser,
} = require('../database/actionsWithTables/userActions');

router.post('/api/user', async (req, res) => {
    try {
        const data = await addNewUser(req.body);
        res.status(201).send(data)
    } catch (error) {
        res.status(400).send({ message: 'The data already exists!' });
    }
});

router.get('/api/user', async (req, res) => {
    const users = await getAllUsers();
    await res.send(users);
});

router.delete('/api/user', async (req, res) => {
    const data = await deleteUser(req.body);
    res.status(200).send(data)
});

module.exports = router;