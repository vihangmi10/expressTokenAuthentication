class missingCredentials extends Error {
    constructor(message) {
        super();
        this.name = 'Missing credentials';
        this.message = message;
        this.statusCode = 401;
    }
}
class userNameExists extends Error {
    constructor(message) {
        super();
        this.name = 'Username already exists';
        this.message = message;
        this.statusCode = 409;
    }
}
class usernameNotFound extends Error {
    constructor(message) {
        super();
        this.name = 'Username does not exists';
        this.message = message;
        this.statusCode = 403;
    }
}
class invalidPassword extends Error {
    constructor(message) {
        super();
        this.name = 'Invalid Password';
        this.message = message;
        this.statusCode = 401;
    }
}
class unauthorizeUser extends Error {
    constructor(message) {
        super();
        this.name = 'UnAuthorize user';
        this.message = message;
        this.statusCode = 403;
    }
}
class generateTokenFailure extends Error{
    constructor(message){
        super();
        this.name = 'Failed to generate token';
        this.message = message;
        this.statusCode = 500;
        
    }
}
class invalidToken extends Error{
    constructor(message){
        super();
        this.name = 'Invalid Token';
        this.message = message;
        this.statusCode = 401;

    }
}
class passwordEncryptionFailure extends Error{
    constructor(message) {
        super();
        this.name = 'Failed to encrypt password';
        this.message = message;
        this.statusCode = 500;
    }
}
class unavilableStocks extends Error {
    constructor(message) {
        super();
        this.name = 'Stocks not available';
        this.message = message;
        this.statusCode = 500;
    }
}
class bcryptEncryptError extends Error {
    constructor(message) {
        super();
        this.name = 'Error encrypting the password';
        this.message = message;
        this.statusCode = 500;
    }
}
class bcryptVerifyError extends Error {
    constructor(message) {
        super();
        this.name = 'Error verifying the password';
        this.message = message;
        this.statusCode = 500;
    }
}

module.exports = {
    missingCredentials,
    userNameExists,
    usernameNotFound,
    invalidPassword,
    unauthorizeUser,
    generateTokenFailure,
    invalidToken,
    passwordEncryptionFailure,
    unavilableStocks,
    bcryptEncryptError,
    bcryptVerifyError
};