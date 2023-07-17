const { sequelize, DataTypes } = require('../connectDataBase');
const { Subcategorie } = require('./subcategorie');

const Categorie = sequelize.define(
    'categorie',
    {
        categorie_id: {
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

Categorie.hasMany(Subcategorie, {
    foreignKey: 'categorie_id',
});
Subcategorie.belongsTo(Categorie, {
    foreignKey: 'categorie_id',
});

module.exports.Categorie = Categorie;