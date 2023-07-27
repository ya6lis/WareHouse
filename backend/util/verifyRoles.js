const verifyRoles = (allowedRole) => {
    return (req, res, next) => {
        if(!allowedRole === req.roles) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles