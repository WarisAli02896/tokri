const { DataTypes, ForeignKeyConstraintError } = require("sequelize");
const { seq } = require("../../../../utils/sequlize");
const ProductVariation = require("./productValriants");
const ProductImage = require("./productImage");

const Products = seq.define('Products', {
    
    product_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    shop_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    barcode:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:"Product name can not be null",
            }
        }
    },
    Description:{
        type:DataTypes.STRING
    }
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "products",
});

Products.hasMany(
    ProductVariation,{
        as:'productvariantion',
        foreignKey: 'product_id'
    }
);

Products.hasMany(
    ProductImage,{
        as:'productImage',
        foreignKey: 'product_id'
    }
);

module.exports = Products;