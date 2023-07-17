const { sequelize, DataTypes } = require('../connectDataBase');
const { Product } = require('./product');

const Subcategorie = sequelize.define(
    'subcategorie',
    {
        subcategorie_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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

Subcategorie.hasMany(Product, {
    foreignKey: 'subcategorie_id',
});
Product.belongsTo(Subcategorie, {
    foreignKey: 'subcategorie_id',
});

module.exports.Subcategorie = Subcategorie;