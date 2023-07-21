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
    const products = await Product.findAll({
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
    return await products;
};

const getProduct = async (id) => {
    const product = await Product.findAll({
        attributes: ['product_id', 'name', 'price', 'unit', 'is_deleted'],
        where: {
            product_id: id,
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
    return await product;
};

const updateProduct = async (id, info) => {
    await Product.update(
        {
            name: info.modalName,
            price: info.modalPrice,
            unit: info.unit,
            subcategory_id: info.subcategory_id,
            producer_id: info.producer_id,
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

module.exports.addNewProduct = addNewProduct;
module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
