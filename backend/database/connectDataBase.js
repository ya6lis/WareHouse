require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.SEQUELIZE_URL, { logging: false });

const connectDataBase = () => {
    sequelize
        .authenticate()
        .then((data) => console.log('Connecting with db successful...'))
        .catch((err) => {
            console.log('Connecting ends with error...');
        });
};

module.exports.connectDataBase = connectDataBase;
module.exports.sequelize = sequelize;
module.exports.DataTypes = DataTypes;
module.exports.Sequelize = Sequelize;
