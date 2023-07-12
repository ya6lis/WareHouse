const { sequelize, DataTypes } = require('../connectDataBase');
const { UnderCategory } = require('./under_category');

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

Category.hasMany(UnderCategory, {
    foreignKey: 'category_id',
});
UnderCategory.belongsTo(Category, {
    foreignKey: 'category_id',
});

module.exports.Category = Category;
