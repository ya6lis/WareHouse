const { Categorie } = require('../tables/categorie');
const { Subcategorie } = require('../tables/subcategorie');

const addNewCategorie = async (data) => {
    return await Categorie.create({
        name: data.name,
    });
};

const getAllCategories = async () => {
    const categories = await Categorie.findAll({
        attributes: ['categorie_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        },
    });
    return await categories;
};

const deleteCategorie = async (id) => {
    await Categorie.update(
        {
            is_deleted: true,
        },
        {
            where: { categorie_id: id },
        }
    );
    await Subcategorie.update(
        {
            is_deleted: true,
        },
        {
            where: { categorie_id: id },
        }
    );
};

module.exports.addNewCategorie = addNewCategorie;
module.exports.getAllCategories = getAllCategories;
module.exports.deleteCategorie = deleteCategorie;
