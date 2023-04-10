var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// =====
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dokumenRouter = require('./routes/dokumen')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dokumen', dokumenRouter);
module.exports = app;
