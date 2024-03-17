const { DataTypes } = require("sequelize");
const { seq } = require("../../../utils/sequlize");
const Products = require("../products/products");

const Shops = seq.define('Shops', {
    shop_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        unique: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:"Shop name can not be null",
            }
        }
    },
    city:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"City name not provided"
            }
        }
    },
    area:{
        type:DataTypes.STRING,
        allowNull: false,
        notNull:{
            msg:"Area name not provided"
        }
    },
    address:{
        type:DataTypes.STRING,
        allowNull: false,
        notNull:{
            msg:"Address name not provided"
        }
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    pictures:{
        type:DataTypes.JSON,
        // allowNull:false
    }
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "shops",
    hooks:{

    }
});

Shops.hasMany(
    Products,{
        as: 'products',
        foreignKey: 'shopId'
    }
)


module.exports = Shops;