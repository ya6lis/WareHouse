const { sequelize } = require('./connectDataBase');
const { User } = require('./tables/user');
const { Category } = require('./tables/category');
const { Subcategory } = require('./tables/subcategory');
const { Producer } = require('./tables/producer');
const { Product } = require('./tables/product');
const { Storage } = require('./tables/storage');
const { ProductAmount } = require('./tables/product_amount');

const createTables = async () => {
    sequelize
        .sync()
        .then((data) => {
            // Creating unique key for product_amount table.
            sequelize.queryInterface.addConstraint('product_amount', {
                fields: ['storage_id', 'product_id'],
                type: 'unique',
                name: 'storage_product_uk',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.createTables = createTables;
