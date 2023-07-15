const { ProductAmount } = require('../tables/product_amount');

const addNewProductAmount = async (data) => {
    try {
        try {
            return await ProductAmount.create({
                amount: data.amount,
                storage_id: data.storage_id,
                product_id: data.product_id,
            });
        } catch {
            let amount = 0;
            ProductAmount.findAll(
                {
                    where: {
                        storage_id: data.storage_id,
                        product_id: data.product_id,
                    },
                },
                {
                    attributes: ['amount'],
                }
            )
                //Getting old value
                .then((values) => {
                    for (const prAm of values) {
                        amount = prAm.amount;
                    }
                })
                .then(() => {
                    return ProductAmount.update(
                        {
                            amount: amount + parseFloat(Math.abs(data.amount)),
                        },
                        {
                            where: {
                                storage_id: data.storage_id,
                                product_id: data.product_id,
                            },
                        }
                    );
                });
        }
    } catch (error) {
        console.log(error);
    }
};

const returnProductAmounts = async () => {
    const productAmounts = await ProductAmount.findAll({
        attributes: ['amount', 'storage_id', 'product_id'],
    });
    return await productAmounts;
};

module.exports.addNewProductAmount = addNewProductAmount;
module.exports.returnProductAmounts = returnProductAmounts;
