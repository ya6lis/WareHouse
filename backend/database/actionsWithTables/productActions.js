const { Product } = require('../tables/product');

const addNewProduct = async (data) => {
    try {
        return await Product.create({
            name: data.name,
            price: data.price,
            unit: data.unit,
            subcategory_id: data.subcategory_id,
            producer_id: data.producer_id,
        });
    } catch (error) {
        console.log(error);
    }
};

const returnProducts = async () => {
    const products = await Product.findAll({
        attributes: ['product_id', 'name', 'price', 'unit', 'subcategory_id', 'producer_id', 'is_deleted'],
        where: {
            is_deleted: false,
        }
    });
    return await products;
};

const isDeleteProduct = async (data) => {
    await Product.update(
        {
            is_deleted: true,
        },
        {
            where: { product_id: Object.values(data) },
        }
    );
};

module.exports.addNewProduct = addNewProduct;
module.exports.returnProducts = returnProducts;
module.exports.isDeleteProduct = isDeleteProduct;