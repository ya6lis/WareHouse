module.exports.sendError = function(res, error) {
    switch (error.name) {
        case 'SequelizeUniqueConstraintError':
            res.status(409).send({ 'message': 'The name already exists!' });
            break;
        default:
            res.status(404).send({ 'message': 'Not found!' });
            break;
    }
};