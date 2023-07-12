const { User } = require('./tables/user');

const addNewUser = async (data) => {
    return await User.create({
        login: data.login,
        password: data.password,
        email: data.email,
        name: data.name,
    });
};

const returnUsers = async () => {
    const users = await User.findAll({
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
