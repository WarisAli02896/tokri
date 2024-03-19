const { DataTypes, ForeignKeyConstraintError, Model } = require("sequelize");
const { seq } = require("../../../utils/sequlize");

const ProductReview = seq.define('ProductReview', {
    
    review_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    comments:{
        type: DataTypes.STRING,
    },
    Description:{
        type:DataTypes.STRING
    }
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "ProductReview",
});

Model.exports = ProductReview;