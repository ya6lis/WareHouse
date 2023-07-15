const { Producer } = require('../tables/producer');

const addNewProducer = async (data) => {
    return await Producer.create({
        name: data.name,
    });
};

const returnProducer = async () => {
    const producers = await Producer.findAll({
        attributes: ['producer_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        }
    });
    return await producers;
};

const isDeleteProducer = async (data) => {
    await Producer.update(
        {
            is_deleted: true,
        },
        {
            where: { producer_id: Object.values(data) },
        }
    );
};

module.exports.addNewProducer = addNewProducer;
module.exports.returnProducer = returnProducer;
module.exports.isDeleteProducer = isDeleteProducer;