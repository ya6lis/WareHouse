const express = require('express');
const router = express.Router();

const {
    addNewUser,
    returnUsers,
    isDeleteUser,
} = require('../database/actionsWithTables/userActions');

router.post('/api/user', async (req, res) => {
    const data = await addNewUser(req.body);
    res.status(201).send(data)
});

router.get('/api/user', async (req, res) => {
    const users = await returnUsers();
    await res.send(users);
});

router.delete('/api/user', async (req, res) => {
    const data = await isDeleteUser(req.body);
    res.status(200).send(data)
});

module.exports = router;