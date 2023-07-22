const { Subcategory } = require('../tables/subcategory');
const { Category } = require('../tables/category');
const { Product } = require('../tables/product');

const addNewSubcategory = async (data) => {
    try {
        return await Subcategory.create({
            name: data.name,
            category_id: data.category_id,
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllSubcategories = async () => {
    const subcategories = await Subcategory.findAll({
        attributes: ['subcategory_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        },
        include: [
            {
                model: Category,
                where: {
                    is_deleted: false,
                },
            },
        ],
    });
    return await subcategories;
};

const getSubcategory = async (id) => {
    const subcategory = await Subcategory.findAll({
        attributes: ['subcategory_id', 'name', 'is_deleted'],
        where: {
            subcategory_id: id,
        },
        include: [
            {
                model: Category,
                where: {
                    is_deleted: false,
                },
            },
        ],
    });
    return await subcategory;
};

const updateSubcategory = async (id, info) => {
    await Subcategory.update(
        {
            name: info.modalName,
            category_id: info.category_id,
        },
        {
            where: { subcategory_id: id },
        }
    );
};

const deleteSubcategory = async (id) => {
    await Subcategory.update(
        {
            is_deleted: true,
        },
        {
            where: { subcategory_id: id },
        }
    );
    await Product.update(
        {
            is_deleted: true,
        },
        {
            where: { subcategory_id: id },
        }
    );
};

module.exports = {
    addNewSubcategory,
    getAllSubcategories,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory,
}