let router = require('express').Router();
let connection = require('../../utils/database_utils/database_connection');
let bodyParser = require('body-parser');
let post_request_util = require('../../utils/request_utils/post_request_util');
let sql_statements = require('../../utils/database_utils/sql_statements');
let status_codes = require('../../utils/request_utils/status_codes');
let constants = require('../../utils/constants');

router.post('/create-quiz', bodyParser.json(), function (req, res) {
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
          // 1. Get the book by name
          connection.query(sql_statements.get_book_by_name, [req.body.book], function (err, rows) {
              if (err) {
                  res.status(status_codes.internal_server_error);
                  res.json({ message: constants.error_messages.db_query, err: err});
              } else {
                if (rows.length !== 0) {
                  let book_id = rows[0].id;
                  // 2. Make sure the book doesn't already have a quiz with the same name
                  connection.query(sql_statements.get_quiz_by_name_and_book_id, [req.body.name, book_id], function (err, rows) {
                      if (err) {
                        res.status(status_codes.internal_server_error);
                        res.json({ message: constants.error_messages.db_query, err: err});
                      } else {
                        if (rows.length !== 0) {
                          res.status(status_codes.conflict);
                          res.json({ message: constants.error_messages.duplicate_quiz, err: err});
                        } else {
                          connection.query(sql_statements.insert_quiz, [req.body.name, book_id], function (err, rows) {
                              connection.release();
                              if (err) {
                                res.status(status_codes.internal_server_error);
                                res.json({ message: constants.error_messages.db_query, err: err});
                              } else {
                                res.status(status_codes.ok);
                                res.json({ message: constants.success_messages.new_quiz, data: rows});
                              }
                            });
                        }
                      }
                    });
                } else {
                  res.status(status_codes.conflict);
                  res.json({ message: constants.error_messages.book_not_found, err: err});
                }
            }
        });
      }
    });
  }
});

router.get('/create-quiz', function(req, res) {
  res.status(status_codes.method_not_allowed);
  res.set('Allow', ['POST']);
  res.json({ message: constants.method_not_allowed});
});

router.put('/create-quiz', function(req, res) {
  res.status(status_codes.method_not_allowed);
  res.set('Allow', ['POST']);
  res.json({ message: constants.method_not_allowed});
});

router.patch('/create-quiz', function(req, res) {
  res.status(status_codes.method_not_allowed);
  res.set('Allow', ['POST']);
  res.json({ message: constants.method_not_allowed});
});

router.delete('/create-quiz', function(req, res) {
  res.status(status_codes.method_not_allowed);
  res.set('Allow', ['POST']);
  res.json({ message: constants.method_not_allowed});
});

module.exports = router;
