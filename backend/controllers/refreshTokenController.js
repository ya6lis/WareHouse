const {
    getUserDataForRefresh,
    addToken,
} = require('../database/actionsWithTables/userActions');
const { sendError } = require('../util/sendError');
const { getAccessToken, getRefreshToken } = require('../util/getTokens');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(401);
        } 
        const refreshToken = cookies.jwt;
        const data = await getUserDataForRefresh(refreshToken);

        try {
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
        } catch (error) {
            return res.sendStatus(403);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = { handleRefreshToken };
