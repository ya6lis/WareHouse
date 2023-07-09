const {
    connectDataBase,
    sequelize,
    DataTypes,
} = require('../../backend/database/connectDataBase');
const { addNewUser } = require('../../backend/database/editingUser');

module.exports.addNewUser = addNewUser;