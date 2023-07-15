const { sequelize, DataTypes } = require('../connectDataBase');
const { Product } = require('./product');

const Subcategory = sequelize.define(
    'subcategory',
    {
        subcategory_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
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

Subcategory.hasMany(Product, {
    foreignKey: 'subcategory_id',
});
Product.belongsTo(Subcategory, {
    foreignKey: 'subcategory_id',
});

module.exports.Subcategory = Subcategory;