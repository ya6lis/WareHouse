const { Category } = require('../tables/category');
const { Subcategory } = require('../tables/subcategory');
const { Product } = require('../tables/product');

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
    // DELETING PRODUCTS
    try {
        const data = await Subcategory.findAll({
            attributes: ['subcategory_id'],
            where: { category_id: id },
        });
        data.forEach(async (e) => {
            console.log(e.dataValues.subcategory_id);
            await Product.update(
                {
                    is_deleted: true,
                },
                {
                    where: { subcategory_id: e.dataValues.subcategory_id },
                }
            );
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addNewCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
