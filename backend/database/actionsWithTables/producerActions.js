const { Producer } = require('../tables/producer');
const { Product } = require('../tables/product');

const addNewProducer = async (data) => {
    return await Producer.create({
        name: data.name,
    });
};

const getAllProducers = async () => {
    const producers = await Producer.findAll({
        attributes: ['producer_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        },
    });
    return await producers;
};

const getProducer = async (id) => {
    const producer = await Producer.findAll({
        attributes: ['producer_id', 'name', 'is_deleted'],
        where: {
            producer_id: id,
            is_deleted: false,
        },
    });
    return await producer;
};

const updateProducer = async (id, info) => {
    await Producer.update(
        {
            name: info.modalName,
        },
        {
            where: { producer_id: id },
        }
    );
};

const deleteProducer = async (id) => {
    await Producer.update(
        {
            is_deleted: true,
        },
        {
            where: { producer_id: id },
        }
    );
    await Product.update(
        {
            is_deleted: true,
        },
        {
            where: { producer_id: id },
        }
    );
};

module.exports.addNewProducer = addNewProducer;
module.exports.getAllProducers = getAllProducers;
module.exports.getProducer = getProducer;
module.exports.updateProducer = updateProducer;
module.exports.deleteProducer = deleteProducer;
