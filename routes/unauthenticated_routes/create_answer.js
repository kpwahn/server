let router = require('express').Router();
let connection = require('../../utils/database_utils/database_connection');
let bcrypt_util = require('../../utils/encryption_utils/bcrypt_util');
let sql_statements = require('../../utils/database_utils/sql_statements');
let post_request_util = require('../../utils/request_utils/post_request_util');
let status_codes = require('../../utils/request_utils/status_codes');
let constants = require('../../utils/constants');
let bodyParser = require('body-parser');

router.post('/', bodyParser.json(), function (req, res) {
  let request_check = post_request_util.checkReqBody(req, constants.expected_bodies.create_answer);

  if( !request_check.has_correct_keys ){
    res.status(status_codes.bad_request);
    res.json({missing_keys: request_check.missing_keys});
  } else {
    connection.getConnection(function (err, connection) {
      if (err) {
        res.status(status_codes.internal_server_error);
        res.json({ message: constants.error_messages.db_connect, err: err});
      } else {
        // 1. DOES THE ANSWER ALREADY EXIST?
        connection.query(sql_statements.select_answer, [req.body.answer], function (err, rows) {
          if (err) {
            res.status(status_codes.internal_server_error);
            res.json({ message: constants.error_messages.db_query, err: err});
          } else {
            if(rows.length === 0) {
              // 2. DOES THE QUESTION EXIST?
              connection.query(sql_statements.select_question, [req.body.question], function (err, rows) {
                if (err) {
                  res.status(status_codes.internal_server_error);
                  res.json({ message: constants.error_messages.db_query, err: err});
                } else {
                  if (rows.length !== 0) {
                    // 3. PUT THE ANSWER IN THE multiple_choice_answer_table
                    var question_id = rows[0].id;
                    connection.query(sql_statements.insert_answer, [req.body.answer], function (err, rows) {
                      if (err) {
                        res.status(status_codes.internal_server_error);
                        res.json({ message: constants.error_messages.db_query, err: err});
                      } else {
                        // 4. GET THAT ANSWERS ID
                        connection.query(sql_statements.select_answer, [req.body.answer], function (err, rows) {
                          if (err) {
                            res.status(status_codes.internal_server_error);
                            res.json({ message: constants.error_messages.db_query, err: err});
                          } else {
                            // 5. Add question_id and answer_id to join table
                            var answer_id = rows[0].id;
                            connection.query(sql_statements.insert_question_answer, [question_id, answer_id, req.body.correct], function (err, rows) {
                              if (err) {
                                res.status(status_codes.internal_server_error);
                                res.json({ message: constants.error_messages.db_query, err: err});
                              } else {
                                res.status(status_codes.ok);
                                res.json({ message: constants.success_messages.new_answer, err: err});
                              }
                            });
                          }
                        });
                      }
                    });
                  } else {
                    res.status(status_codes.conflict);
                    res.json({ message: constants.error_messages.question_not_found, err: err});
                  }
                }
              });
            } else {
              res.status(status_codes.conflict);
              res.json({ message: constants.error_messages.duplicate_answer, err: err});
            }
          }
        });
      }
    });
  }
});

router.get('/', function(req, res) {
  // TODO The response MUST include an Allow header containing a list of valid methods for the requested resource.
  res.status(status_codes.method_not_allowed);
  res.json({ message: constants.method_not_allowed});
});

router.put('/', function(req, res) {
  // TODO The response MUST include an Allow header containing a list of valid methods for the requested resource.
  res.status(status_codes.method_not_allowed);
  res.json({ message: constants.method_not_allowed});
});

router.patch('/', function(req, res) {
  // TODO The response MUST include an Allow header containing a list of valid methods for the requested resource.
  res.status(status_codes.method_not_allowed);
  res.json({ message: constants.method_not_allowed});
});

router.delete('/', function(req, res) {
  // TODO The response MUST include an Allow header containing a list of valid methods for the requested resource.
  res.status(status_codes.method_not_allowed);
  res.json({ message: constants.method_not_allowed});
});

module.exports = router;
