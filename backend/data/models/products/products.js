const { DataTypes, ForeignKeyConstraintError } = require("sequelize");
const { seq } = require("../../../utils/sequlize");

const Products = seq.define('Products', {
    
    poduct_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    shop_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
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
    barcode:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
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

module.exports = Products;