const { seq } = require('../../../../utils/sequlize');
const { DataTypes } = require('sequelize');
const MailSync = require('../../mailSync');
const Shops = require('../shop/shops');

const ShopKeeper = seq.define('Shopkeeper', {
    shopKeeper_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Shopkeeper firstname can not be null'
            }
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Shopkeeper lastname can not be null'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Shopkeeper email can not be null'
            },
            isEmail:{
                msg:"Email format is not correct"
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Shopkeeper phone can not be null'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Shopkeeper password can not be null'
            }
        }
    },
    cnic: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Shopkeeper CNIC can not be null'
            }
        }
    },
    ntn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Shopkeeper NTN can not be null'
            }
        }
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //     notNull: {
        //         msg: 'Shopkeeper NTN can not be null'
        //     }
        // }
    },
    cnic_back: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //     notNull: {
        //         msg: 'Shopkeeper CNIC Back picture can not be null'
        //     }
        // }
    },
    cnic_front: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //     notNull: {
        //         msg: 'Shopkeeper CNIC Front picture can not be null'
        //     }
        // }
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notNull: {
                msg: 'Shopkeeper deleted can not be null'
            }
        }
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notNull: {
                msg: 'Shopkeeper verified can not be null'
            }
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Shop Keeper',
        validate: {
            notNull: {
                msg: "Shop Keeper user type not defined"
            }
        }
    }
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: "shopkeeper",
    hooks: {
        afterCreate: (record) => {
            delete record.dataValues.password
            if (record) {
                if (record.dataValues.is_deleted == 1) {
                    delete record.dataValues.is_deleted;
                    record.dataValues.is_deleted = "Deactive"
                } else if (record.dataValues.is_deleted == 0) {
                    delete record.dataValues.is_deleted;
                    record.dataValues.is_deleted = "Active"
                }
            }
        },
        afterUpdate: (record) => {
            delete record.dataValues.password
            if (record) {
                if (record.dataValues.is_deleted == 1) {
                    delete record.dataValues.is_deleted;
                    record.dataValues.is_deleted = "Deactive"
                } else if (record.dataValues.is_deleted == 0) {
                    delete record.dataValues.is_deleted;
                    record.dataValues.is_deleted = "Active"
                }
            }
        },
        afterFind:(record) => {
            if (record) {
                if (record.dataValues.is_deleted == 1) {
                    delete record.dataValues.is_deleted;
                    record.dataValues.is_deleted = "Deactive"
                } else if (record.dataValues.is_deleted == 0) {
                    delete record.dataValues.is_deleted;
                    record.dataValues.is_deleted = "Active"
                }
            }
        },
    }
});

ShopKeeper.hasMany(
    Shops,
    {
        as: 'shops',
        foreignKey: 'user_id'
    }
)

module.exports = ShopKeeper