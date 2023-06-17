var mysql = require('mysql');

var con = mysql.createConnection({
    host : 'localhost',
    user : 'mmari',
    password : 'mmari123',
    database : 'login'
});

con.connect();

module.exports = { con };