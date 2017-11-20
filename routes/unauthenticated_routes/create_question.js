let router = require('express').Router();
let connection = require('../../utils/database_utils/database_connection');
let bodyParser = require('body-parser');
let post_request_util = require('../../utils/request_utils/post_request_util');
let sql_statements = require('../../utils/database_utils/sql_statements');
let status_codes = require('../../utils/request_utils/status_codes');
let constants = require('../../utils/constants');

router.post('/', bodyParser.json(), function (req, res) {
  let request_check = post_request_util.checkReqBody(req, constants.expected_bodies.create_question);

  if( !request_check.has_correct_keys ){
      res.status(status_codes.bad_request);
      res.json({missing_keys: request_check.missing_keys});
  } else {
    connection.getConnection(function (err, connection) {
        if (err) {
            res.status(status_codes.internal_server_error);
            res.json({ message: constants.error_messages.db_connect, err: err});
        } else {
          // 1. DOES THE QUIZ EXIST?
          connection.query(sql_statements.select_quiz, [req.body.quiz_name], function (err, rows) {
              if (err) {
                  res.status(status_codes.internal_server_error);
                  res.json({ message: constants.error_messages.db_query, err: err});
              } else {
                if (rows.length !== 0) {
                  // 2. DOES THAT QUESTION ALREADY EXIST?
                  var quiz_id = rows[0].id
                  connection.query(sql_statements.select_question_by_question_and_id, [quiz_id, req.body.question], function (err, rows) {
                    if (err) {
                      res.status(status_codes.internal_server_error);
                      res.json({ message: constants.error_messages.db_query, err: err});
                    } else {
                      if (rows.length === 0 ){
                        connection.query(sql_statements.insert_question, [req.body.question, quiz_id], function (err, rows) {
                          connection.release();
                          if (err) {
                            res.status(status_codes.internal_server_error);
                            res.json({ message: constants.error_messages.db_query, err: err});
                          } else {
                            res.status(status_codes.ok);
                            res.json({ message: constants.success_messages.new_question, err: err});
                          }
                        });
                      } else {
                        res.status(status_codes.conflict);
                        res.json({ message: constants.error_messages.duplicate_question, err: err});
                      }
                    }
                  });
                } else {
                  res.status(status_codes.conflict);
                  res.json({ message: constants.error_messages.question_not_found, err: err});
                }
            }
        });
      }
    });
  }
});

module.exports = router;
