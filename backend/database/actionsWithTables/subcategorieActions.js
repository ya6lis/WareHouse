const { Subcategorie } = require('../tables/subcategorie');
const { Categorie } = require('../tables/categorie');
const { Product } = require('../tables/product');

const addNewSubcategorie = async (data) => {
    try {
        return await Subcategorie.create({
            name: data.name,
            categorie_id: data.categorie_id,
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllSubcategories = async () => {
    const subcategories = await Subcategorie.findAll({
        attributes: ['subcategorie_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        },
        include: [
            {
                model: Categorie,
                where: {
                    is_deleted: false,
                },
            },
        ],
    });
    return await subcategories;
};

const updateSubcategorie = async (id, info) => {
    await Subcategorie.update(
        {
            name: info.modalName,
            categorie_id: info.categorie_id,
        },
        {
            where: { subcategorie_id: id },
        }
    );
};

const deleteSubcategorie = async (id) => {
    await Subcategorie.update(
        {
            is_deleted: true,
        },
        {
            where: { subcategorie_id: id },
        }
    );
    await Product.update(
        {
            is_deleted: true,
        },
        {
            where: { subcategorie_id: id },
        }
    );
};

module.exports.addNewSubcategorie = addNewSubcategorie;
module.exports.getAllSubcategories = getAllSubcategories;
module.exports.updateSubcategorie = updateSubcategorie;
module.exports.deleteSubcategorie = deleteSubcategorie;
