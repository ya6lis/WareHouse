const bcrypt = require('bcrypt')
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
        attributes: ['user_id', 'login', 'email', 'name', 'is_admin', 'is_deleted'],
        where: {
            is_deleted: false,
        }
    });
    return await users;
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
module.exports.deleteUser = deleteUser;
