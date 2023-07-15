const { Category } = require('../tables/category');

const addNewCategory = async (data) => {
    return await Category.create({
        name: data.name,
    });
};

const returnCategorys = async () => {
    const categorys = await Category.findAll({
        attributes: ['category_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        }
    });
    return await categorys;
};

const isDeleteCategory = async (data) => {
    await Category.update(
        {
            is_deleted: true,
        },
        {
            where: { category_id: Object.values(data) },
        }
    );
};

module.exports.addNewCategory = addNewCategory;
module.exports.returnCategorys = returnCategorys;
module.exports.isDeleteCategory = isDeleteCategory;