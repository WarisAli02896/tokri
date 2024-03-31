const jwt = require('jsonwebtoken');
const crypt = require('crypto-js');

exports.encrypt_Url = (value) => {
    var jsonString = JSON.stringify(value);
    var encryptString = crypt.AES.encrypt(jsonString, '2896').toString();
    return encryptString
}

exports.decrypt_Url = (value) => {

    const bytes = CryptoJS.AES.decrypt(value, 'secret key 123');
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    const decryptedData = JSON.parse(decryptedString);
    return decryptedData
}