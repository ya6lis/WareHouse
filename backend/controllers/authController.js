const {
    getUserDataForAuth,
    addToken,
} = require('../database/actionsWithTables/userActions');
const { sendError } = require('../util/sendError');
const { getAccessToken, getRefreshToken } = require('../util/getTokens');

const bcrypt = require('bcrypt');
require('dotenv').config();

const handleLogin = async (req, res) => {
    try {
        const { login, password } = req.body;

        const data = await getUserDataForAuth(login);
        const match = await bcrypt.compare(password, data.password);

        if (match) {
            const accessToken = getAccessToken(data);
            const refreshToken = getRefreshToken(data);

            addToken(data.login, refreshToken);
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            res.json({ accessToken });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = { handleLogin };
