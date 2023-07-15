const { Storage } = require('../tables/storage');

const addNewStorage = async (data) => {
    return await Storage.create({
        name: data.name,
    });
};

const returnStorages = async () => {
    const storages = await Storage.findAll({
        attributes: ['storage_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        }
    });
    return await storages;
};

const isDeleteStorage = async (data) => {
    await Storage.update(
        {
            is_deleted: true,
        },
        {
            where: { storage_id: Object.values(data) },
        }
    );
};

module.exports.addNewStorage = addNewStorage;
module.exports.returnStorages = returnStorages;
module.exports.isDeleteStorage = isDeleteStorage;