const {
    connectDataBase,
    sequelize,
    DataTypes,
} = require('../../backend/database/connectDataBase');
const { addNewUser } = require('../../backend/database/editingDataBase/editingUser');

module.exports.addNewUser = addNewUser;