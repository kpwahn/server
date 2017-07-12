let mysql = require('mysql');

let connection = mysql.createPool({
    host     : 'localhost',
    user     : '',
    password : '',
    database : ''
});

module.exports = connection;
