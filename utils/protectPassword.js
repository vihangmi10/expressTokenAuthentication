const errorHandler = require('../utils/error');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const encrypt = async (plainTextPassword) => {
    try {
        return await bcrypt.hash(plainTextPassword, saltRounds);
    } catch (e) {
        throw new errorHandler.bcryptEncryptError('Error while encrypting the password');
    }
};
const verifyPassword = async (userEnteredPassword, encryptedPassword) => {
    try {
        return await bcrypt.compare(userEnteredPassword, encryptedPassword)
    } catch (e) {
        throw new errorHandler.bcryptVerifyError('Error verifying the password');
    }
};

module.exports = {
    encrypt,
    verifyPassword
};