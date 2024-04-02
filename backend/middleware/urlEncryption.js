const jwt = require('jsonwebtoken');
const crypt = require('crypto-js');

exports.encrypt_Url = (value) => {
    var jsonString = JSON.stringify(value);
    var encryptString = crypt.AES.encrypt(jsonString, '2896').toString();
    // const bytes = crypt.AES.decrypt(encryptString, 'secret key 123');
    
    return encryptString

    // const text = JSON.stringify(value); // Convert data to JSON string
    // const iv = crypto.randomBytes(16); // Generate a random initialization vector
    // const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from("secretKey"), iv);
    // let encrypted = cipher.update(text, 'utf8', 'hex');
    // encrypted += cipher.final('hex');
    // const encryptedString = JSON.parse(decrypted);
    // this.decrypt_Url(encryptedString);
    // return iv.toString('hex') + encrypted;
}

exports.decrypt_Url = (encryptedText) => {
    const ciphertext = encryptedText.padEnd(32, '='); // Add padding if necessary
    const decrypted = crypt.AES.decrypt(ciphertext, '2896').toString(crypt.enc.Utf8);
    const decryptedData = JSON.parse(decrypted);
    return decryptedData

    // const bytes = crypt.AES.decrypt(value, 'secret key 123');
    // const decryptedString = bytes.toString(crypt.enc.Utf8);
    // const decryptedData = JSON.parse(decryptedString);
    // return decryptedData

    // const iv = Buffer.from(encryptedText.slice(0, 32), 'hex'); // Extract IV from encrypted text
    // const encryptedData = encryptedText.slice(32); // Extract encrypted data
    // const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from("secretKey"), iv);
    // let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    // decrypted += decipher.final('utf8');
    // return JSON.parse(decrypted);
}