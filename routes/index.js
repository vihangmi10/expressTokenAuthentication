/* eslint-disable object-curly-newline */
const { Router } = require('express');
const { encrypt } = require('../utils/protectPassword');
const { verifyPassword } = require('../utils/protectPassword');
const tokenUtil = require('../utils/generateToken');
const handleUser = require('../handler/storeUserProfiles');
const errorHandler = require('../utils/error');

const router = Router();

router.post('/register', (req, res,next) => {
  if (!req.body.username || !req.body.password) {
    throw new errorHandler.MissingCredentials('Missing credentials to register please add username and password');
  }
  if (handleUser.checkUser(req.body.username)) {
    throw new errorHandler.UserNameExists('Username already exists please pick another username');
  }

  encrypt(req.body.password)
    .then((encryptedPassword) => {
      // eslint-disable-next-line object-curly-newline
      handleUser.storeUserInformation({ username: req.body.username,
        password: encryptedPassword });
      return tokenUtil.generateToken(req.body.username)
        .then((token) => {
          res.status(200).send({ token });
        })
        .catch((e) => {
          next(e);
        });
    })
    .catch((e) => {
      next(e);
    });
});

router.post('/login', (req, res, next) => {
  const userDetails = req.body;
  if (!userDetails.username || !userDetails.password) throw new errorHandler.MissingCredentials('Missing credentials please enter username and password');
  if (!handleUser.checkUser(userDetails.username)) throw new errorHandler.UsernameNotFound('Username does not exists');
  const userInformation = handleUser.getUserInformation(userDetails.username);

  verifyPassword(userDetails.password, userInformation.password)
    .then((verifiedPassword) => {
      if (!verifiedPassword) throw new errorHandler.InvalidPassword('Invalid Password please check your password');
      return tokenUtil.generateToken(userInformation.username)
        .then((token) => {
          res.status(200).send({
            message: 'Authorized username and password',
            token
          });
        })
        .catch((e) => {
          next(e);
        });
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
