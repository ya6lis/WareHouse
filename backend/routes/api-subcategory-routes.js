const express = require('express');
const router = express.Router();

const {
    addNewSubcategory,
    returnSubcategorys,
    isDeleteSubcategory,
} = require('../database/actionsWithTables/subcategoryActions');

const {
    returnCategorys,
} = require('../database/actionsWithTables/categoryActions');

router.post('/api/subcategory', async (req, res) => {
    const data = await addNewSubcategory(req.body);
    res.status(201).send(data);
});

router.get('/api/subcategory', async (req, res) => {
    const subcategorys = await returnSubcategorys();
    const categorys = await returnCategorys();
    await res.send([subcategorys, categorys]);
});

router.delete('/api/subcategory', async (req, res) => {
    const data = await isDeleteSubcategory(req.body);
    res.status(200).send(data);
});

module.exports = router;
