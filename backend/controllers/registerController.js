const { addNewUser } = require('../database/actionsWithTables/userActions');
const { sendError } = require('../util/sendError');

const handleNewUser = async (req, res) => {
    try {
        const data = await addNewUser(req.body);
        res.status(201).send(data);
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = { handleNewUser };
