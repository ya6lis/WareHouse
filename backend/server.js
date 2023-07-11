require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { connectDataBase } = require('../backend/database/connectDataBase');
const {
    addNewUser,
    returnUsers,
    deleteUser,
} = require('../backend/database/editingUser');

connectDataBase();

app.use(express.json());
app.use(cors());


app.post('/api/user', async (req, res) => {
    await addNewUser(req.body);
});

app.delete('/api/user', async (req, res) => {
    await deleteUser(req.body);
});

app.get('/api/user', async (req, res) => {
    const users = await returnUsers();
    await res.json(JSON.parse(users));
});


app.listen(process.env.PORT, (error) => {
    error
        ? console.log(error)
        : console.log(`Listening port ${process.env.PORT}`);
});
