const { ProductAmount } = require('../tables/product_amount');

const addNewProductAmount = async (data) => {
    return await ProductAmount.create({
        amount: data.amount,
        storage_id: data.storage_id,
        product_id: data.product_id,
    });
};

const returnProductAmounts = async () => {
    const productAmounts = await ProductAmount.findAll({
        attributes: ['amount', 'storage_id', 'product_id'],
    });
    return await productAmounts;
};

module.exports = {
    addNewProductAmount,
    returnProductAmounts,
};
