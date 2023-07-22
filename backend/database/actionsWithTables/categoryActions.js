const { Category } = require('../tables/category');
const { Subcategory } = require('../tables/subcategory');

const addNewCategory = async (data) => {
    return await Category.create({
        name: data.name,
    });
};

const getAllCategories = async () => {
    const categories = await Category.findAll({
        attributes: ['category_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        },
    });
    return await categories;
};

const getCategory = async (id) => {
    const category = await Category.findAll({
        attributes: ['category_id', 'name', 'is_deleted'],
        where: {
            category_id: id,
        },
    });
    return await category;
};

const updateCategory = async (id, info) => {
    await Category.update(
        {
            name: info.modalName,
        },
        {
            where: { category_id: id },
        }
    );
};

const deleteCategory = async (id) => {
    await Category.update(
        {
            is_deleted: true,
        },
        {
            where: { category_id: id },
        }
    );
    await Subcategory.update(
        {
            is_deleted: true,
        },
        {
            where: { category_id: id },
        }
    );
};

module.exports = {
    addNewCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
}