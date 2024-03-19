const { DataTypes, ForeignKeyConstraintError } = require("sequelize");
const { seq } = require("../../../utils/sequlize");

const ProductCategoryMapping = seq.define('ProductCategoryMapping', {
    poduct_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    productCategory_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "productCategoryMapping",
});

module.exports = ProductCategoryMapping;