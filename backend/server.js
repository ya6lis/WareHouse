require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { connectDataBase } = require('../backend/database/connectDataBase');
const {
    addNewUser,
    returnUsers,
    isDeleteUser,
} = require('../backend/database/editingUser');

connectDataBase();

app.use(express.json());
app.use(cors());

app.post('/api/user', async (req, res) => {
    const a = await addNewUser(req.body);
    res.status(201).send(a)
    
});

app.delete('/api/user', async (req, res) => {
    const d = await isDeleteUser(req.body);
    res.status(200).send(d)
});

app.get('/api/user', async (req, res) => {
    const users = await returnUsers();
    await res.send(users);
});

app.listen(process.env.PORT, (error) => {
    error
        ? console.log(error)
        : console.log(`Listening port ${process.env.PORT}`);
});
