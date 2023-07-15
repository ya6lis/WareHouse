const { sequelize, DataTypes } = require('../connectDataBase');
const { Subcategory } = require('./subcategory');

const Category = sequelize.define(
    'category',
    {
        category_id: {
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

Category.hasMany(Subcategory, {
    foreignKey: 'category_id',
});
Subcategory.belongsTo(Category, {
    foreignKey: 'category_id',
});

module.exports.Category = Category;