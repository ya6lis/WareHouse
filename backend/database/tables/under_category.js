const { sequelize, DataTypes } = require('../connectDataBase');
const { Product } = require('./product');

const UnderCategory = sequelize.define(
    'under_category',
    {
        under_category_id: {
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

UnderCategory.hasMany(Product, {
    
    foreignKey: 'under_category_id',
});
Product.belongsTo(UnderCategory, {
    foreignKey: 'under_category_id',
});

module.exports.UnderCategory = UnderCategory;