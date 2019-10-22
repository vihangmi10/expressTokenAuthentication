const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error');
const SECRET_KEY = 'thisismysimpleauthenticationappforInvoice2go';
const tokenExpiry = Math.floor(Date.now() / 1000) + (60 * 60);

const generateToken = (userName) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            exp: tokenExpiry,
            data: userName,
        }, SECRET_KEY);
        if(token)resolve(token);
        reject(new errorHandler.generateTokenFailure('Unable to generate token'));
    });

};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, res) => {
            if(err) {
                reject(new errorHandler.invalidToken('Invalid Token'));
            }
            resolve(res.data);
        });
    })
};

module.exports = {
    generateToken,
    verifyToken
};