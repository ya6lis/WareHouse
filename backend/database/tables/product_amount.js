const { sequelize, DataTypes } = require('../connectDataBase');
const { Product } = require('./product');
const { Storage } = require('./storage');

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

Storage.belongsToMany(Product, {
    through: ProductAmount,
    foreignKey: 'storage_id',
});
Product.belongsToMany(Storage, {
    through: ProductAmount,
    foreignKey: 'product_id',
});

module.exports.ProductAmount = ProductAmount;
