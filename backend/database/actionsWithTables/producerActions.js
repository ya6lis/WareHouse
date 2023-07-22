const { Producer } = require('../tables/producer');
const { Product } = require('../tables/product');

const addNewProducer = async (data) => {
    return await Producer.create({
        name: data.name,
    });
};

const getAllProducers = async () => {
    return await Producer.findAll({
        attributes: ['producer_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        },
    });
};

const getProducer = async (id) => {
    const producer = await Producer.findByPk(id, {attributes: ['producer_id', 'name', 'is_deleted']});
    if (!producer) {
        throw new Error('Sequelize not found an object!');
    }
    return producer;
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

module.exports = {
    addNewProducer,
    getAllProducers,
    getProducer,
    updateProducer,
    deleteProducer,
}