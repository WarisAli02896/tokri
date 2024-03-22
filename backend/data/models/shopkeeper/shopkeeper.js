const { DataTypes, INTEGER } = require("sequelize");
const { seq } = require("../../../utils/sequlize");

const Shopkeepers = seq.define('shopkeepers',{
    shopkeeper_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        unique:true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Firstname can not be null"
            },
            isAlpha: {
                msg: "Firstname can only contain Alphabatic Characters"
            },
            max: 40
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "lastname can not be null"
            },
            isAlpha: {
                msg: "lastname contains only Alphabatic Characters"
            },
            max: 20
        }
    },
    shop_email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Email can not be null"
            },
            isEmail: {
                msg: "format for email is not correct"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "password can not be null"
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Mobile number cannot be null"
            }
        }

    },
    cnic: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "cnic can not be null"
            },
            isNumeric: {
                msg: "number are only allowed in cnic"
            }
        }
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cnic_front: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "users",
    hooks: {
        afterCreate: (record) => {
            delete record.dataValues.password
        },
        afterUpdate: (record) => {
            delete record.dataValues.password
        }
    }
    
    
});
module.exports = Shopkeepers;