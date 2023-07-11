const { User } = require('./creatingTable');

const addNewUser = (data) => {
    User.create({
        login: data.login,
        password: data.password,
        email: data.email,
        name: data.name,
    });
};

const returnUsers = async () => {
    const users = await User.findAll();
    return await JSON.stringify(users, null, 2);
};

const deleteUser = async (data) => {
    await User.destroy({
        where: {
            user_id: Object.values(data),
        },
    });
};

module.exports.addNewUser = addNewUser;
module.exports.returnUsers = returnUsers;
module.exports.deleteUser = deleteUser;
