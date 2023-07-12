const { sequelize, DataTypes } = require('../connectDataBase');
const { Product } = require('./product');

const Producer = sequelize.define(
    'producer',
    {
        producer_id: {
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

Producer.hasMany(Product, {
    foreignKey: 'producer_id',
});
Product.belongsTo(Producer, {
    foreignKey: 'producer_id',
});

module.exports.Producer = Producer;
