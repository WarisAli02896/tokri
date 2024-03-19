const { DataTypes, ForeignKeyConstraintError } = require("sequelize");
const { seq } = require("../../../utils/sequlize");

const ProductCategory = seq.define('ProductCategory', {
    
    poductCategory_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:"Product Category name can not be null",
            }
        }
    },
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "productCategory",
});

ProductCategory.hasMany(
    Products,{
        as: 'products',
        foreignKey: 'productCategory_id'
    }
)

module.exports = ProductCategory;