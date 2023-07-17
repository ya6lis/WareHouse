const { Storage } = require('../tables/storage');
const { Product } = require('../tables/product');

const addNewStorage = async (data) => {
    return await Storage.create({
        name: data.name,
    });
};

const getAllStorages = async () => {
    const storages = await Storage.findAll({
        attributes: ['storage_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        },
    });
    return await storages;
};

const deleteStorage = async (data) => {
    await Storage.update(
        {
            is_deleted: true,
        },
        {
            where: { storage_id: data.id },
        }
    );
    await Product.update(
        {
            is_deleted: true,
        },
        {
            where: { storage_id: data.id },
        }
    );
};

module.exports.addNewStorage = addNewStorage;
module.exports.getAllStorages = getAllStorages;
module.exports.deleteStorage = deleteStorage;
