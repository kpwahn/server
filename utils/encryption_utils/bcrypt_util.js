let connection = require('../database_utils/database_connection');
let sql_statements = require ('../database_utils/sql_statements');
let bcrypt = require('bcrypt');

// TODO pull saltRounds from server
const saltRounds = 10;

module.exports = {
    encrypt: function(plainText, callback) {
        bcrypt.hash(plainText, saltRounds, function (err, hash) {
            if (err) {
                callback(err, false);
            } else {
                callback(null, hash);
            }
        });
    },

    compare: function(plainText, email, callback) {
        connection.getConnection(function (err, connection) {
            if(err) {
                callback(err, false);
            }
            connection.query(sql_statements.select_email, [email], function (err, rows) {
                if (err) {
                    callback(err, false);
                } else if (rows.length == 1) {
                    let hash = rows[0].password;

                    bcrypt.compare(plainText, hash, function (err, res) {
                        if (err) {
                            callback(err, false);
                        } else {
                            // bcrypt.compare() - Response is true if compare succeeds, false otherwise
                            callback(null, res);
                        }
                    });
                }
            });
        });
    }
}
