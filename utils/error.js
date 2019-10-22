// eslint-disable-next-line max-classes-per-file
class MissingCredentials extends Error {
  constructor(message) {
    super();
    this.name = 'Missing credentials';
    this.message = message;
    this.statusCode = 401;
  }
}
class UserNameExists extends Error {
  constructor(message) {
    super();
    this.name = 'Username already exists';
    this.message = message;
    this.statusCode = 409;
  }
}
class UsernameNotFound extends Error {
  constructor(message) {
    super();
    this.name = 'Username does not exists';
    this.message = message;
    this.statusCode = 403;
  }
}
class InvalidPassword extends Error {
  constructor(message) {
    super();
    this.name = 'Invalid Password';
    this.message = message;
    this.statusCode = 401;
  }
}
class UnauthorizeUser extends Error {
  constructor(message) {
    super();
    this.name = 'UnAuthorize user';
    this.message = message;
    this.statusCode = 403;
  }
}
class GenerateTokenFailure extends Error {
  constructor(message) {
    super();
    this.name = 'Failed to generate token';
    this.message = message;
    this.statusCode = 500;
  }
}
class InvalidToken extends Error {
  constructor(message) {
    super();
    this.name = 'Invalid Token';
    this.message = message;
    this.statusCode = 401;
  }
}
class PasswordEncryptionFailure extends Error {
  constructor(message) {
    super();
    this.name = 'Failed to encrypt password';
    this.message = message;
    this.statusCode = 500;
  }
}
class UnavilableStocks extends Error {
  constructor(message) {
    super();
    this.name = 'Stocks not available';
    this.message = message;
    this.statusCode = 500;
  }
}
class BcryptEncryptError extends Error {
  constructor(message) {
    super();
    this.name = 'Error encrypting the password';
    this.message = message;
    this.statusCode = 500;
  }
}
class BcryptVerifyError extends Error {
  constructor(message) {
    super();
    this.name = 'Error verifying the password';
    this.message = message;
    this.statusCode = 500;
  }
}

module.exports = {
  MissingCredentials,
  UserNameExists,
  UsernameNotFound,
  InvalidPassword,
  UnauthorizeUser,
  GenerateTokenFailure,
  InvalidToken,
  PasswordEncryptionFailure,
  UnavilableStocks,
  BcryptEncryptError,
  BcryptVerifyError
};
