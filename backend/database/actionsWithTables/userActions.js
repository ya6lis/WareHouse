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
    const users = await User.findAll({
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
    return await users;
};

const getUser = async (id) => {
    const user = await User.findAll({
        attributes: [
            'user_id',
            'login',
            'email',
            'name',
            'is_admin',
            'is_deleted',
        ],
        where: {
            user_id: id,
            is_deleted: false,
        },
    });
    return await user;
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

module.exports.addNewUser = addNewUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
