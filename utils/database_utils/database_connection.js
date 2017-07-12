let mysql = require('mysql');

// TODO export credentials to one place, and pull from server!!
let connection = mysql.createPool({
    host     : 'localhost',
    user     : '',
    password : '',
    database : ''
});

module.exports = connection;
