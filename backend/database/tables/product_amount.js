const { sequelize, DataTypes } = require('../connectDataBase');

const ProductAmount = sequelize.define(
    'product_amount',
    {
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports.ProductAmount = ProductAmount;