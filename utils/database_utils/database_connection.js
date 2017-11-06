let mysql = require('mysql');

let connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'harry_potter',
    port: 3001
});

module.exports = connection;
