const jwt = require('jsonwebtoken');
const crypt = require('crypto-js');
const Update = require('../data/models/sync/update');

exports.encrypt_Url = (value) => {
    var jsonString = JSON.stringify(value);
    var encryptString = crypt.AES.encrypt(jsonString, '2896').toString();
    return encryptString
}

exports.decrypt_Url = (encryptedText) => {
    const ciphertext = encryptedText.padEnd(32, '='); // Add padding if necessary
    const decrypted = crypt.AES.decrypt(ciphertext, '2896').toString(crypt.enc.Utf8);
    const decryptedData = JSON.parse(decrypted);
    return decryptedData;
}
exports.encrypt = async (value) => {
    var jsonString = JSON.stringify(value);
    var encryptString = crypt.AES.encrypt(jsonString, process.env.SECRET_KEY).toString();
    await Update.create(
        {
            data: encryptString
        }
    )
        .then(async (data) => {
            encryptString = data.dataValues.id
        })
        .catch(async (error) => {
            return error
        })
    return encryptString
}

exports.decrypt = async (encryptedText) => {
    await Update.findByPk(
        encryptedText
    )
        .then(async (data) => {
            encryptedText = data.dataValues.data;
        })
        .catch(async (error) => {
            return error;
        })
    const ciphertext = encryptedText.padEnd(32, '='); // Add padding if necessary
    const decrypted = crypt.AES.decrypt(ciphertext, process.env.SECRET_KEY).toString(crypt.enc.Utf8);
    const decryptedData = JSON.parse(decrypted);
    return decryptedData;
}