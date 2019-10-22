const { Router } = require('express');

const router = Router();
const token = require('../utils/generateToken');
const handleUsers = require('../handler/storeUserProfiles');
const stockInfo = require('../handler/getUpdatedStocks');
const errorHandle = require('../utils/error');


const authorizeUser = (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header === 'undefined') throw new errorHandle.UnauthorizeUser('User must login to view this information');
  const bearer = header.split(' ');
  const userTokenStr = bearer[1];
  const userToken = userTokenStr.replace(/['"]/g, '');

  token.verifyToken(userToken).then((userName) => {
    if (!handleUsers.checkUser(userName)) throw new errorHandle.UsernameNotFound('User does not exists');
    next();
  })
    .catch((error) => {
      next(error);
    });
};

router.get('/', authorizeUser, (req, res, next) => {
  const tickerSymbol = req.query.ticker;

  stockInfo.calculateAverage(tickerSymbol)
    .then((averageObj) => {
      res.status(200).send(averageObj);
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
