const errorHandler = require('../utils/error');


// stock object
/*
{
  tickerName: [] // array of prices
}
*/
const stocks = {};

const pullUpdatedStock = (stockObject) => {
  let arr = [];
  if (!(stockObject.ticker in stocks)) {
    arr.push(stockObject.price);
    stocks[stockObject.ticker] = arr;
  } else {
    arr = stocks[stockObject.ticker];
    arr.push(stockObject.price);
    stocks[stockObject.ticker] = arr;
  }
  return true;
};

const getStockInformation = (ticker) => {
  if (!(ticker in stocks)) return [];
  return stocks[ticker];
};
const getRecentPrices = (stockArr) => {
  const arrLen = stockArr.length;
  const startIndex = arrLen - 10;
  const recentArr = [];
  for (let i = startIndex; i < arrLen; i++) {
    recentArr.push(stockArr[i]);
  }
  return recentArr;
};
const average = (arr) => {
  const total = (arr.reduce((a, b) => a + b, 0));
  return (total / arr.length).toFixed(2);
};
const calculateAverage = (ticker) => new Promise((resolve, reject) => {
  const stockArr = getStockInformation(ticker);
  const resultObj = {};
  if (stockArr.length === 0) {
    reject(new errorHandler.UnavilableStocks('No stocks available for the given ticker symbol'));
  }
  if (stockArr.length < 10) {
    resultObj.message = 'Since the recent prices are less than 10 the average will not be accurate';
    resultObj.average = average(stockArr);
  } else {
    const recentStockPrice = getRecentPrices(stockArr);
    resultObj.message = 'We have sufficient data to predict accurate average';
    resultObj.average = average(recentStockPrice);
  }
  resolve(resultObj);
});

module.exports = {
  pullUpdatedStock,
  getStockInformation,
  calculateAverage
};
