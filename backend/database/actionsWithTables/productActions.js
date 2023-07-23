const { Product } = require('../tables/product');
const { Subcategory } = require('../tables/subcategory');
const { Producer } = require('../tables/producer');

const { addNewProductAmount } = require('./productAmountActions');

const addNewProduct = async (data) => {
    const newProduct = await Product.create({
        name: data.name,
        price: data.price,
        unit: data.unit,
        subcategory_id: data.subcategory_id,
        producer_id: data.producer_id,
    });
    let dataForProductAmount = {
        amount: data.amount,
        storage_id: data.storage_id,
        product_id: newProduct.product_id,
    };
    await addNewProductAmount(dataForProductAmount);
};

const getAllProducts = async () => {
    return await Product.findAll({
        attributes: ['product_id', 'name', 'price', 'unit', 'is_deleted'],
        where: {
            is_deleted: false,
        },
        include: [
            {
                model: Subcategory,
                where: {
                    is_deleted: false,
                },
            },
            {
                model: Producer,
                where: {
                    is_deleted: false,
                },
            },
        ],
    });
};

const getProduct = async (id) => {
    const product = await Product.findByPk(id, {
        attributes: ['product_id', 'name', 'price', 'unit', 'is_deleted'],
    });
    if (!product) {
        throw new Error('Sequelize not found an object!');
    }
    return product;
};

const updateProduct = async (id, data) => {
    await Product.update(
        {
            name: data.name,
            price: data.price,
            unit: data.unit,
            subcategory_id: data.subcategory_id,
            producer_id: data.producer_id,
        },
        {
            where: { product_id: id },
        }
    );
};

const deleteProduct = async (id) => {
    await Product.update(
        {
            is_deleted: true,
        },
        {
            where: { product_id: id },
        }
    );
};

module.exports = {
    addNewProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
