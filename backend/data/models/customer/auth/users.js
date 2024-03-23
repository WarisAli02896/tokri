const { DataTypes } = require("sequelize");
const { seq } = require("../../../../utils/sequlize");
const MailSync = require("../../mailSync");
const Shops = require("../../shopKeeper/shop/shops");

const Users = seq.define('Users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "firstname can not be null"
            },
            isAlpha: {
                msg: "firstname contains only Alphabatic Characters"
            },
            max: 20
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
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "email can not be null"
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
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true
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

Users.hasMany(
    MailSync,
    {
        as: 'mailSync',
        foreignKey: 'user_id'
    }
);

// Users.hasMany(
//     Shops,
//     {
//         as: 'shops',
//         foreignKey: 'user_id'
//     }
// )
module.exports = Users;