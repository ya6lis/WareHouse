const { Producer } = require('../tables/producer');
const { Product } = require('../tables/product');

const addNewProducer = async (data) => {
    return await Producer.create({
        name: data.name,
    });
};

const getAllProducer = async () => {
    const producers = await Producer.findAll({
        attributes: ['producer_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        },
    });
    return await producers;
};

const deleteProducer = async (data) => {
    await Producer.update(
        {
            is_deleted: true,
        },
        {
            where: { producer_id: data.id },
        }
    );
    await Product.update(
        {
            is_deleted: true,
        },
        {
            where: { producer_id: data.id },
        }
    );
};

module.exports.addNewProducer = addNewProducer;
module.exports.getAllProducer = getAllProducer;
module.exports.deleteProducer = deleteProducer;
