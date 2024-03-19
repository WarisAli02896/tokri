const { DataTypes, ForeignKeyConstraintError } = require("sequelize");
const { seq } = require("../../../utils/sequlize");

const ProductVariants = seq.define('ProductVariation', {
    
    variant_id:{
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
    quantity:{
        type: DataTypes.STRING
    },
    color:{
        type:DataTypes.JSON,
    }
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "productVariation",
});

module.exports = ProductVariants;