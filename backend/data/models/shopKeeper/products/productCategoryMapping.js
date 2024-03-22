const { DataTypes, ForeignKeyConstraintError } = require("sequelize");
const { seq } = require("../../../../utils/sequlize");
const Products = require("./products");
const ProductCategory = require("./productCategory");

const ProductCategoryMapping = seq.define('ProductCategoryMapping', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productCategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "pro_cat_map",
});

Products.belongsToMany(
    ProductCategory, {
    through: ProductCategoryMapping,
    as: 'products',
    foreignKey: 'product_id'
});

ProductCategory.belongsToMany(
    Products, {
    through: ProductCategoryMapping,
    as: 'category',
    foreignKey: 'productCategory_id'
});

ProductCategoryMapping.sync()
.then(()=>{
    console.log(" create mapping");
})
.catch((error)=>{
    console.log(error)
})

module.export = ProductCategoryMapping;