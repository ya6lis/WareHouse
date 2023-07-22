const { Storage } = require('../tables/storage');

const addNewStorage = async (data) => {
    return await Storage.create({
        name: data.name,
    });
};

const getAllStorages = async () => {
    return await Storage.findAll({
        attributes: ['storage_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        },
    });
};

const getStorage = async (id) => {
    return await Storage.findByPk(id, {attributes: ['storage_id', 'name', 'is_deleted']});
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

module.exports = {
    addNewStorage,
    getAllStorages,
    getStorage,
    updateStorage,
    deleteStorage,
}