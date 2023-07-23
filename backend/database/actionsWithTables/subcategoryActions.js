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
    return await Subcategory.findAll({
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
};

const getSubcategory = async (id) => {
    const subcategory = await Subcategory.findByPk(id, {
        attributes: ['subcategory_id', 'name', 'is_deleted'],
    });
    if (!subcategory) {
        throw new Error('Sequelize not found an object!');
    }
    return subcategory;
};

const updateSubcategory = async (id, data) => {
    await Subcategory.update(
        {
            name: data.name,
            category_id: data.category_id,
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
};
