var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mysql = require('mysql');
var mustacheExpress = require('mustache-express');

var app = express();

var con = mysql.createConnection({
    host : 'localhost',
    user : 'mmari',
    password : 'mmari123',
    database : 'login'
});

con.connect();
// view engine setup
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views',path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;

console.log("Node is running");