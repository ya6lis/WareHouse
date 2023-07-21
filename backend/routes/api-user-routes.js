const express = require('express');
const router = express.Router();

const {
    addNewUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
} = require('../database/actionsWithTables/userActions');

const url = '/api/v1/user'

router.post(url, async (req, res) => {
    try {
        const data = await addNewUser(req.body);
        res.status(201).send(data)
    } catch (error) {
        res.status(400).send({ message: 'The data already exists!' });
    }
});

router.get(url, async (req, res) => {
    const users = await getAllUsers();
    await res.send(users);
});

router.get(`${url}/:id`, async (req, res) => {
    const user = await getUser(req.params.id);
    await res.send(user);
});

router.patch(`${url}/:id`, async (req, res) => {
    try {
        const userInfo = await updateUser(req.params.id, req.body);
        res.status(200).send(userInfo);
    } catch (error) {
        res.status(400).send({ message: 'The data already exists!' });
    }
});

router.delete(`${url}/:id`, async (req, res) => {
    const userId = await deleteUser(req.params.id);
    res.status(200).send(userId)
});

module.exports = router;