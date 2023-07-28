require('dotenv').config();
const jwt = require('jsonwebtoken');

const getAccessToken = (data) => {
    return jwt.sign(
        { UserInfo: { login: data.login, is_admin: data.is_admin } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
    );
}

const getRefreshToken = (data) => {
    return jwt.sign(
        { login: data.login },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
}

module.exports = { getAccessToken, getRefreshToken };