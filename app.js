var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mustacheExpress = require('mustache-express');
const passport = require('passport');
require('./passport')(passport);
const { router } = require("./routes/auth");

var app = express();


// view engine setup
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use('/auth', router);

app.route('/androidLogin')
    .post(function(req, res){
        var loginQuery = 'select * from users where username = \'' + req.body.username +
            '\' and password = \'' + req.body.password + '\';';
        con.query(loginQuery, function (error, result) {
            if (error) throw error;
            console.log(result);
            if (JSON.stringify(result) != "[]") {
                res.send({
                    isSuccessful: true
                });
            } else {
                res.send({
                    isSuccessful: false
                });
            }
        });
    });

app.get('/stream', (req,res) => {
    if(req.cookies.user)
        res.render('stream');
    else
        res.redirect('/');
});

app.get('/', (req,res) => {
    res.render('index');
});

app.use(passport.initialize());

// app.get('/stream', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.render('stream');
//     res.send('You have accessed a protected route!');
// });

// app.use(function(req, res, next) {
//     next(createError(404));
// });

module.exports = app;

console.log("Node is running");