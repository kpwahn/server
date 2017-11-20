let router = require('express').Router();
let connection = require('../../utils/database_utils/database_connection');
let bodyParser = require('body-parser');
let post_request_util = require('../../utils/request_utils/post_request_util');
let sql_statements = require('../../utils/database_utils/sql_statements');
let status_codes = require('../../utils/request_utils/status_codes');
let constants = require('../../utils/constants');

router.post('/', bodyParser.json(), function (req, res) {
  let request_check = post_request_util.checkReqBody(req, constants.expected_bodies.create_quiz);

  if( !request_check.has_correct_keys ){
      res.status(status_codes.bad_request);
      res.json({missing_keys: request_check.missing_keys});
  } else {
    connection.getConnection(function (err, connection) {
        if (err) {
            res.status(status_codes.internal_server_error);
            res.json({ message: constants.error_messages.db_connect, err: err});
        } else {
          connection.query(sql_statements.select_quiz, [req.body.name], function (err, rows) {
              if (err) {
                  res.status(status_codes.internal_server_error);
                  res.json({ message: constants.error_messages.db_query, err: err});
              } else {
                if (rows.length == 0) {
                  connection.query(sql_statements.insert_quiz, [req.body.name, req.body.book], function (err, rows) {
                      connection.release();
                      if (err) {
                          if (err.code === "WARN_DATA_TRUNCATED") {
                            res.status(status_codes.conflict);
                          } else {
                            res.status(status_codes.internal_server_error);
                          }
                          res.json({ message: constants.error_messages.db_query, err: err});
                      } else {
                        res.status(status_codes.ok);
                        res.json({ message: constants.success_messages.new_quiz, err: err});
                      }
                    });
                } else {
                  res.status(status_codes.conflict);
                  res.json({ message: constants.error_messages.duplicate_quiz, err: err});
                }
            }
        });
      }
    });
  }
});

module.exports = router;
