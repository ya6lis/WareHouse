const express = require('express');
const router = express.Router();
const { sendError } = require('../util/sendError');
const verifyRoles = require('../util/verifyRoles');

const {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
} = require('../database/actionsWithTables/userActions');

const url = '/api/v1/user';

router.get(url, verifyRoles(true), async (req, res) => {
    try {
        const users = await getAllUsers();
        await res.send(users);
    } catch (error) {
        sendError(res, error);
    }
});

router.get(`${url}/:id`, async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        await res.send(user);
    } catch (error) {
        sendError(res, error);
    }
});

router.patch(`${url}/:id`, verifyRoles(true), async (req, res) => {
    try {
        const userInfo = await updateUser(req.params.id, req.body);
        res.status(200).send(userInfo);
    } catch (error) {
        sendError(res, error);
    }
});

router.delete(`${url}/:id`, verifyRoles(true), async (req, res) => {
    try {
        const userId = await deleteUser(req.params.id);
        res.status(200).send(userId);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
