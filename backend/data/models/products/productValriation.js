const { DataTypes, ForeignKeyConstraintError } = require("sequelize");
const { seq } = require("../../../utils/sequlize");

const ProductVariation = seq.define('ProductVariation', {
    
    variation_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    size: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type: DataTypes.STRING,
        allowNull:false,
    },
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "ProductVariation",
});

module.exports = ProductVariation;