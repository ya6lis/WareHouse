const {
    connectDataBase,
    sequelize,
    DataTypes,
} = require('./connectDataBase');

const Category = sequelize.define(
    'category',
    {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

const Producer = sequelize.define(
    'producer',
    {
        producer: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

const Product = sequelize.define(
    'product',
    {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

const ProductAmount = sequelize.define(
    'product_amount',
    {
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

const Stock = sequelize.define(
    'stock',
    {
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

const Storage = sequelize.define(
    'storage',
    {
        storage_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

const UnderCategory = sequelize.define(
    'under_category',
    {
        under_category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

const User = sequelize.define(
    'user',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

Category.hasMany(UnderCategory, {
    constraints: false,
    foreignKey: 'category_id',
});
UnderCategory.belongsTo(Category, {
    foreignKey: 'category_id',
});

UnderCategory.hasMany(Product, {
    constraints: false,
    foreignKey: 'under_category_id',
});
Product.belongsTo(UnderCategory, {
    foreignKey: 'under_category_id',
});

Producer.hasMany(Product, {
    constraints: false,
    foreignKey: 'producer_id',
});
Product.belongsTo(Producer, {
    foreignKey: 'producer_id',
});

Product.hasMany(ProductAmount, {
    constraints: false,
    foreignKey: 'product_id',
});
ProductAmount.belongsTo(Product, {
    foreignKey: 'product_id',
});

Storage.hasMany(Stock, {
    constraints: false,
    foreignKey: 'storage_id',
});
Stock.belongsTo(Storage, {
    foreignKey: 'storage_id',
});

Storage.hasMany(ProductAmount, {
    constraints: false,
    foreignKey: 'storage_id',
});
ProductAmount.belongsTo(Storage, {
    foreignKey: 'storage_id',
});

Storage.hasMany(ProductAmount, {
    constraints: false,
    foreignKey: 'storage_id',
});
ProductAmount.belongsTo(Storage, {
    foreignKey: 'storage_id',
});

Product.hasOne(Stock, {
    constraints: false,
    foreignKey: 'product_id',
});
Stock.belongsTo(Product, {
    foreignKey: 'product_id',
});

Category.hasMany(UnderCategory, {
    constraints: false,
    foreignKey: 'category_id',
});
UnderCategory.belongsTo(Category, {
    foreignKey: 'category_id',
});

UnderCategory.hasMany(Product, {
    constraints: false,
    foreignKey: 'under_category_id',
});
Product.belongsTo(UnderCategory, {
    foreignKey: 'under_category_id',
});

Producer.hasMany(Product, {
    constraints: false,
    foreignKey: 'producer_id',
});
Product.belongsTo(Producer, {
    foreignKey: 'producer_id',
});

Product.hasMany(ProductAmount, {
    constraints: false,
    foreignKey: 'product_id',
});
ProductAmount.belongsTo(Product, {
    foreignKey: 'product_id',
});

Storage.hasMany(Stock, {
    constraints: false,
    foreignKey: 'storage_id',
});
Stock.belongsTo(Storage, {
    foreignKey: 'storage_id',
});

Storage.hasMany(ProductAmount, {
    constraints: false,
    foreignKey: 'storage_id',
});
ProductAmount.belongsTo(Storage, {
    foreignKey: 'storage_id',
});

Storage.hasMany(ProductAmount, {
    constraints: false,
    foreignKey: 'storage_id',
});
ProductAmount.belongsTo(Storage, {
    foreignKey: 'storage_id',
});

Product.hasOne(Stock, {
    constraints: false,
    foreignKey: 'product_id',
});
Stock.belongsTo(Product, {
    foreignKey: 'product_id',
});


const createTables = async () => {
    sequelize
        .sync()
        .then((data) => {})
        .catch((err) => {
            console.log(err);
        });
};



module.exports.createTables = createTables;
module.exports.Category = Category;
module.exports.Producer = Producer;
module.exports.Product = Product;
module.exports.ProductAmount = ProductAmount;
module.exports.Stock = Stock;
module.exports.Storage = Storage;
module.exports.UnderCategory = UnderCategory;
module.exports.User = User;

