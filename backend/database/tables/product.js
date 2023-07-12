const { sequelize, DataTypes } = require('../connectDataBase');
const { Storage } = require('./storage');
const { ProductAmount } = require('./product_amount');

const Product = sequelize.define(
    'product',
    {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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

module.exports.Product = Product;
