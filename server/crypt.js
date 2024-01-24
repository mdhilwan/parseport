const CryptoJS = require('crypto-js')

module.exports = {
    encrypt(data, uuid, iv) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), uuid, {iv: iv}).toString();
    },
    decrypt(encryted, uuid, iv) {
        return CryptoJS.AES.decrypt(encryted.toString(), uuid, {iv: iv}).toString(CryptoJS.enc.Utf8);
    }, 
}