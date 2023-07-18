const { Product } = require('../tables/product');
const { Subcategorie } = require('../tables/subcategorie');
const { Producer } = require('../tables/producer');

const {
    addNewProductAmount,
} = require('./productAmountActions');

const addNewProduct = async (data) => {
    const newProduct = await Product.create({
        name: data.name,
        price: data.price,
        unit: data.unit,
        subcategorie_id: data.subcategorie_id,
        producer_id: data.producer_id,
    });
    let dataForProductAmount = {
        amount: data.amount,
        storage_id: data.storage_id,
        product_id: newProduct.product_id,
    }
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
                model: Subcategorie,
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
module.exports.deleteProduct = deleteProduct;
