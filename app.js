const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');

const indexRouter = require('./routes/index');
const stockUpdaterHook = require('./routes/updateStockPricesWebHook');
const getStockInformation = require('./routes/getStockInformation');

const app = express();

app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/getStocksHook', stockUpdaterHook);
app.use('/getStockInformation', getStockInformation);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.send(err.message);
  res.end();
});

module.exports = app;
