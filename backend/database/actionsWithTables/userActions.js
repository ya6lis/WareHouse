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
    const user = await User.findByPk(id, {
        attributes: [
            'user_id',
            'login',
            'email',
            'name',
            'is_admin',
            'is_deleted',
        ],
    });
    if (!user) {
        throw new Error('Sequelize not found an object!');
    }
    return user;
};

const getUserDataForAuth = async (login) => {
    const user = await User.findOne({
        where: {login: login}
    });
    if (!user) {
        throw new Error('Sequelize not found an object!');
    }
    return user;
};

const addToken = async (login, refreshToken) => {
    await User.update(
        {
            refresh_token: refreshToken,
        },
        {
            where: { login: login },
        }
    );
}

const getUserDataForRefresh = async (refreshToken) => {
    const user = await User.findOne({
        where: {refresh_token: refreshToken}
    });
    if (!user) {
        throw new Error('Sequelize not found an object!');
    }
    return user;
};

const deleteToken = async (refreshToken) => {
    await User.update(
        {
            refresh_token: null,
        },
        {
            where: { refresh_token: refreshToken },
        }
    );
}

const updateUser = async (id, data) => {
    await User.update(
        {
            login: data.login,
            email: data.email,
            name: data.name,
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
    getUserDataForAuth,
    addToken,
    getUserDataForRefresh,
    deleteToken,
    updateUser,
    deleteUser,
};
