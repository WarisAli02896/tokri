const { DataTypes } = require('sequelize');
const { seq } = require('../../../utils/sequlize');
const Shopkeepers = require('./shopkeeper');

const MailSync = seq.define('MailSync', {
    mail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    mail_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shokeeper_id: {
        type: DataTypes.INTEGER,
        unique: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        tableName: 'mailSync'
    }
);

module.exports = MailSync;