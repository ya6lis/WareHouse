const express = require('express');
const router = express.Router();

const {
    addNewSubcategorie,
    getAllSubcategories,
    deleteSubcategorie,
} = require('../database/actionsWithTables/subcategorieActions');

router.post('/api/subcategorie', async (req, res) => {
    try {
        const data = await addNewSubcategorie(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.get('/api/subcategorie', async (req, res) => {
    const subcategories = await getAllSubcategories();
    await res.send(subcategories);
});

router.delete('/api/subcategorie', async (req, res) => {
    const data = await deleteSubcategorie(req.body);
    res.status(200).send(data);
});

module.exports = router;
