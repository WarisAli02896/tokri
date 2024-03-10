const { DataTypes } = require('sequelize');
const { seq } = require('../../../utils/sequlize');
const Users = require('./users');

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
    user_id: {
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
    });

MailSync.sync({
    alter: false
})

// MailSync.hasMany(Users, {
//     foreignKey:{
//         name:'user_id'
//     }
// });
// Users.belongsTo(MailSync);

module.exports = MailSync;