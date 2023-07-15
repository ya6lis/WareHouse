const { Subcategory } = require('../tables/subcategory');

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

const returnSubcategorys = async () => {
    const subcategorys = await Subcategory.findAll({
        attributes: ['subcategory_id', 'name', 'is_deleted', 'category_id'],
        where: {
            is_deleted: false,
        },
    });
    return await subcategorys;
};

const isDeleteSubcategory = async (data) => {
    await Subcategory.update(
        {
            is_deleted: true,
        },
        {
            where: { subcategory_id: Object.values(data) },
        }
    );
};

module.exports.addNewSubcategory = addNewSubcategory;
module.exports.returnSubcategorys = returnSubcategorys;
module.exports.isDeleteSubcategory = isDeleteSubcategory;
