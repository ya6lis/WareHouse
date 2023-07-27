const { deleteToken } = require('../database/actionsWithTables/userActions');
const { sendError } = require('../util/sendError');

const handleLogout = (req, res) => {
    try {
        const cookies = req.cookies;
        const refreshToken = cookies.jwt;

        deleteToken(refreshToken);

        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });
        res.sendStatus(204);
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = { handleLogout };
