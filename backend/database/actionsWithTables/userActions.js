const bcrypt = require('bcrypt')
const { User } = require('../tables/user');

const addNewUser = async (data) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(data.password, 10);

    return await User.create({
        login: data.login,
        password: hash,
        email: data.email,
        name: data.name,
    });
};

const returnUsers = async () => {
    const users = await User.findAll({
        attributes: ['user_id', 'login', 'email', 'name', 'is_admin', 'is_deleted'],
        where: {
            is_deleted: false,
        }
    });
    return await users;
};

const isDeleteUser = async (data) => {
    await User.update(
        {
            is_deleted: true,
        },
        {
            where: { user_id: Object.values(data) },
        }
    );
};

module.exports.addNewUser = addNewUser;
module.exports.returnUsers = returnUsers;
module.exports.isDeleteUser = isDeleteUser;
