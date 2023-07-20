const express = require('express');
const router = express.Router();

const {
    addNewSubcategorie,
    getAllSubcategories,
    updateSubcategorie,
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

router.patch('/api/subcategorie/:id', async (req, res) => {
    try {
        const subcategorieInfo = await updateSubcategorie(req.params.id, req.body);
        res.status(200).send(subcategorieInfo);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.delete('/api/subcategorie/:id', async (req, res) => {
    const subcategorieId = await deleteSubcategorie(req.params.id);
    res.status(200).send(subcategorieId);
});

module.exports = router;
