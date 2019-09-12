const fun_aes = require("./fun_aes.js");

const key = fun_aes.CryptoJS.enc.Hex.parse("13707535364e794c");
//封装加密
function Encrypt(word) {
    var encrypted = fun_aes.CryptoJS.AES.encrypt(word, key, {
        mode: fun_aes.CryptoJS.mode.ECB,
        padding: fun_aes.CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
};
//封装解密
function Decrypt(word) {
    var encryptedHexStr = fun_aes.CryptoJS.format.Hex.parse(word);
    var decrypt = fun_aes.CryptoJS.AES.decrypt(encryptedHexStr, key, {
        mode: fun_aes.CryptoJS.mode.ECB,
        padding: fun_aes.CryptoJS.pad.Pkcs7
    });
    return fun_aes.CryptoJS.enc.Utf8.stringify(decrypt);
}

module.exports = {
    Encrypt,
    Decrypt
}