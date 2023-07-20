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

const updateStorage = async (id, info) => {
    await Storage.update(
        {
            name: info.modalName,
        },
        {
            where: { storage_id: id },
        }
    );
};

const deleteStorage = async (id) => {
    await Storage.update(
        {
            is_deleted: true,
        },
        {
            where: { storage_id: id },
        }
    );
};

module.exports.addNewStorage = addNewStorage;
module.exports.getAllStorages = getAllStorages;
module.exports.updateStorage = updateStorage;
module.exports.deleteStorage = deleteStorage;
