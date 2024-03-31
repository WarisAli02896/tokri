const { DataTypes } = require("sequelize");
const { seq } = require("../../../utils/sequlize");

const Update = seq.define('Update', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    data:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: 'update'
})

module.exports = Update;