const { DataTypes, ForeignKeyConstraintError } = require("sequelize");
const { seq } = require("../../../utils/sequlize");


const ProductImage = seq.define('ProductImage', {
    
    image_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    URL:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_promary:{
        
    },
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "productImage",
});

module.exports = ProductImage;