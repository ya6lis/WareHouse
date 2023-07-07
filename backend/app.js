const { connectingDataBase, sequelize } = require('./database/connectingDataBase');
const { createTables } = require('./database/creatingTable');

const firstStart = async () => {
    let a = Date.now()
    console.log(a)
    await createTables();
    await connectingDataBase();
    console.log(Date.now()-a)
}
firstStart();