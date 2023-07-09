const { User } = require('./creatingTable');

const addNewUser = async (login, password, email, name) => {
    
    await User.create({
        login,
        password,
        email,
        name,
    });
};

module.exports.addNewUser = addNewUser;
