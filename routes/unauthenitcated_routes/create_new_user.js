let router = require('express').Router();
let connection = require('../../utils/database_utils/database_connection');
let bcrypt_util = require('../../utils/encryption_utils/bcrypt_util');
let sql_statements = require('../../utils/database_utils/sql_statements');
let post_request_util = require('../../utils/request_utils/post_request_util');
let status_codes = require('../../utils/request_utils/status_codes');
let constants = require('../../utils/constants');
let bodyParser = require('body-parser');

router.post('/', bodyParser.json(), function (req, res) {
    let request_check = post_request_util.checkReqBody(req, constants.expected_bodies.create_new_user);

    if( !request_check.has_correct_keys ){
        res.status(status_codes.bad_request);
        res.json({missing_keys: request_check.missing_keys});
    } else {
        // 1. ENCRYPT THE PASSWORD
        bcrypt_util.encrypt(req.body.password, function (err, encryptedPassword) {
            if (err) {
                res.status(status_codes.internal_server_error);
                res.json({ message: constants.error_messages.encrypt, err: err});
            } else {
                connection.getConnection(function (err, connection) {
                    if (err) {
                        res.status(status_codes.internal_server_error);
                        res.json({ message: constants.error_messages.db_connect, err: err});
                    } else {
                        // 2. CHECK IF EMAIL ALREADY EXISTS
                        connection.query(sql_statements.select_email, [req.body.email], function (err, rows) {
                            if (err) {
                                res.status(status_codes.internal_server_error);
                                res.json({ message: constants.error_messages.db_query, err: err});
                            } else {
                                if (rows.length == 0) {
                                    // 3. INSERT EMAIL/PASSWORD INTO THE DATABASE
                                    connection.query(sql_statements.insert_email, [req.body.email, encryptedPassword], function (err, rows) {
                                        if (err) {
                                            res.status(status_codes.internal_server_error);
                                            res.json({ message: constants.error_messages.db_query, err: err});
                                        } else {
                                            res.status(status_codes.ok);
                                            res.json({ message: constants.success_messages.new_user, err: err});
                                        }
                                    });
                                } else {
                                    res.status(status_codes.conflict);
                                    res.json({ message: constants.error_messages.duplicate, err: err});
                                }
                            }
                        });
                    }
                });
            }
        })
    }
});

module.exports = router;
