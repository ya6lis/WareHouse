const {
    getUserDataForRefresh,
} = require('../database/actionsWithTables/userActions');
const { sendError } = require('../util/sendError');

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

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (error, decoded) => {
                try {
                    const accessToken = jwt.sign(
                        { UserInfo: { login: decoded.login, is_admin: data.is_admin } },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30s' }
                    );
                    res.json({ accessToken });
                } catch (error) {
                    return res.sendStatus(403);
                }
            }
        );
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = { handleRefreshToken };
