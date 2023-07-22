const bcrypt = require('bcrypt');
const { User } = require('../tables/user');

const addNewUser = async (data) => {
    return await User.create({
        login: data.login,
        password: await bcrypt.hash(data.password, 10),
        email: data.email,
        name: data.name,
    });
};

const getAllUsers = async () => {
    return await User.findAll({
        attributes: [
            'user_id',
            'login',
            'email',
            'name',
            'is_admin',
            'is_deleted',
        ],
        where: {
            is_deleted: false,
        },
    });
};

const getUser = async (id) => {
    const user = await User.findByPk(id, {attributes: [
        'user_id',
        'login',
        'email',
        'name',
        'is_admin',
        'is_deleted',
    ]});
    if (!user) {
        throw new Error('Sequelize not found an object!');
    }
    return user;
};

const updateUser = async (id, info) => {
    await User.update(
        {
            login: info.modalLogin,
            email: info.modalEmail,
            name: info.modalName,
        },
        {
            where: { user_id: id },
        }
    );
};

const deleteUser = async (id) => {
    await User.update(
        {
            is_deleted: true,
        },
        {
            where: { user_id: id },
        }
    );
};

module.exports = {
    addNewUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
};
