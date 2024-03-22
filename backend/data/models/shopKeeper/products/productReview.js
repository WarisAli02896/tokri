const { DataTypes, ForeignKeyConstraintError, Model } = require("sequelize");
const { seq } = require("../../../../utils/sequlize");
const Products = require("./products");
const Users = require("../../customer/auth/users");

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
        allowNull:true
    },
    shop_keeper_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comments:{
        type: DataTypes.STRING,
        allowNull: false
    },
    parent_review_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "ProductReview",
});

ProductReview.belongsTo(
    Products,{
        as:'product_review',
        foreignKey:'product_id'
    }
);

ProductReview.belongsTo(
    Users, {
        as: 'user_review',
        foreignKey: 'user_id',
        allowNull: true
    }
);

module.exports = ProductReview;