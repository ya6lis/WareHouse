require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const {
    connectDataBase,
    sequelize,
    DataTypes,
} = require('./backend/database/connectDataBase');
const { addNewUser } = require('./frontend/models/dataEditing');
const { log } = require('console');

connectDataBase();

const app = express();

const createPath = (page) =>
    path.resolve(__dirname, 'frontend/ejs', `${page}.ejs`);

app.listen(process.env.PORT, (error) => {
    error
        ? console.log(error)
        : console.log(`Listening port ${process.env.PORT}`);
});

app.use(express.urlencoded({ extended: false }));

app.use(express.static('frontend/assets/styles'));

app.post('/', (req, res) => {
    try {
        const { login, password, email, name } = req.body;
        if (
            !login.includes(' ') &&
            !(login === '') &&
            !password.includes(' ') &&
            !(password === '') &&
            !email.includes(' ') &&
            !(email === '') &&
            !name.includes(' ') &&
            !(name === '')
        ) {
            addNewUser(login, password, email, name);
            res.render(createPath('index'));
        } else {
            res.render(createPath('error'));
        }
    } catch (error) {
        res.render(createPath('error'));
    }
});

app.get('/', (req, res) => {
    res.render(createPath('index'));
});

app.use((req, res) => {
    res.render(createPath('error'));
});
