const {
    getUserDataForAuth,
} = require('../database/actionsWithTables/userActions');

const verifyRoles = (allowedRole) => {
    return async (req, res, next) => {
        const data = await getUserDataForAuth(req.user)
        if(!(data.is_admin === allowedRole)){
            return res.sendStatus(403);
        }
        next();
    }
}
module.exports = verifyRoles