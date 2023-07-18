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

router.delete('/api/user/:id', async (req, res) => {
    const userId = await deleteUser(req.params.id);
    res.status(200).send(userId)
});

module.exports = router;