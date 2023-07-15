const express = require('express');
const router = express.Router();

const {
    addNewCategory,
    returnCategorys,
    isDeleteCategory,
} = require('../database/actionsWithTables/categoryActions');

router.post('/api/category', async (req, res) => {
    const data = await addNewCategory(req.body);
    res.status(201).send(data);
});

router.get('/api/category', async (req, res) => {
    const categorys = await returnCategorys();
    await res.send(categorys);
});

router.delete('/api/category', async (req, res) => {
    const data = await isDeleteCategory(req.body);
    res.status(200).send(data)
});

module.exports = router;
