const { seq } = require('../../../utils/sequlize')
const { DataTypes } = require('sequelize');

const Mail = seq.define('Mail', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: 'mail',
    hooks: {
        afterFind: (record) => {
            if (record.dataValues.status == 1) {
                delete record.dataValues.status
                record.dataValues.status = "SYNCED"
            } else if (record.dataValues.status == 0) {
                delete record.dataValues.status
                record.dataValues.status = "SYNCED FAILED"
            }
        },
        afterCreate: (record) => {
            if (record.dataValues.status == 1) {
                delete record.dataValues.status
                record.dataValues.status = "SYNCED"
            } else if (record.dataValues.status == 0) {
                delete record.dataValues.status
                record.dataValues.status = "SYNCED FAILED"
            }
        },
        afterUpdate: (record) => {
            if (record.dataValues.status == 1) {
                delete record.dataValues.status
                record.dataValues.status = "SYNCED"
            } else if (record.dataValues.status == 0) {
                delete record.dataValues.status
                record.dataValues.status = "SYNCED FAILED"
            }
        }
    }
});

module.exports = Mail;