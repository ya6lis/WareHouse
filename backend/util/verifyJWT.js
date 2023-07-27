const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
            try {
                req.user = decoded.UserInfo.login;
                req.roles = decoded.UserInfo.is_admin;
                next();
            } catch (error) {
                return res.sendStatus(403);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = verifyJWT;
