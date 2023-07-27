const {
    getUserDataForAuth,
    addToken,
} = require('../database/actionsWithTables/userActions');
const { sendError } = require('../util/sendError');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    try {
        const { login, password } = req.body;

        const data = await getUserDataForAuth(login);
        const match = await bcrypt.compare(password, data.password);

        if (match) {
            const accessToken = jwt.sign(
                { UserInfo: { login: data.login, is_admin: data.is_admin } },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            const refreshToken = jwt.sign(
                { login: data.login },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

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
