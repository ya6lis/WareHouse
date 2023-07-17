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

const deleteSubcategorie = async (data) => {
    await Subcategorie.update(
        {
            is_deleted: true,
        },
        {
            where: { subcategorie_id: data.id },
        }
    );
    await Product.update(
        {
            is_deleted: true,
        },
        {
            where: { subcategorie_id: data.id },
        }
    );
};

module.exports.addNewSubcategorie = addNewSubcategorie;
module.exports.getAllSubcategories = getAllSubcategories;
module.exports.deleteSubcategorie = deleteSubcategorie;
