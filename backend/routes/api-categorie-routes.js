const express = require('express');
const router = express.Router();

const {
    addNewCategorie,
    getAllCategories,
    updateCategorie,
    deleteCategorie,
} = require('../database/actionsWithTables/categorieActions');

router.post('/api/categorie', async (req, res) => {
    try {
        const data = await addNewCategorie(req.body);
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.get('/api/categorie', async (req, res) => {
    const categories = await getAllCategories();
    await res.send(categories);
});

router.patch('/api/categorie/:id', async (req, res) => {
    try {
        const categorieInfo = await updateCategorie(req.params.id, req.body);
        res.status(200).send(categorieInfo);
    } catch (error) {
        res.status(400).send({ message: 'The name already exists!' });
    }
});

router.delete('/api/categorie/:id', async (req, res) => {
    const categorieId = await deleteCategorie(req.params.id);
    res.status(200).send(categorieId);
});

module.exports = router;
