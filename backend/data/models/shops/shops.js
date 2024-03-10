const { DataTypes } = require("sequelize");
const { seq } = require("../../../utils/sequlize");

exports.Shops = seq.define('Shops', {
    shop_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    user_id:{
        type: DataTypes.INET,
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
        allowNull:false
    }
})