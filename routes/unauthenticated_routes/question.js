let router = require('express').Router();
let connection = require('../../utils/database_utils/database_connection');
let sql_statements = require('../../utils/database_utils/sql_statements');
let get_request_util = require('../../utils/request_utils/get_request_util');
let status_codes = require('../../utils/request_utils/status_codes');
let constants = require('../../utils/constants');

router.get('/', function (req, res) {
  let request_check = get_request_util.checkReqBody(req, constants.expected_query_params.question);

  if( !request_check.has_correct_params ){
      res.status(status_codes.bad_request);
      res.json({missing_params: request_check.missing_params});
  } else {
    connection.getConnection(function (err, connection) {
        if (err) {
            res.status(status_codes.internal_server_error);
            res.json({ message: constants.error_messages.db_connect, err: err});
        } else {
          //1. GET QUIZ ID
          // TODO possible security vulnerablility here. Need to esacpe query params?
          connection.query(sql_statements.select_quiz_query_weridness + req.query.quiz_name, function (err, rows) {
              if (err) {
                  res.status(status_codes.internal_server_error);
                  res.json({ message: constants.error_messages.db_query, err: err});
              } else {
                if (rows.length === 0) {
                  res.status(status_codes.ok);
                  res.json({ message: "Quiz name not found", data: [] });
                } else {
                  // 2. GET ALL QUESTIONS WITH THAT QUIZ ID
                  var quiz_id = rows[0].id;
                  connection.query(sql_statements.select_question_by_id, [quiz_id], function (err, rows) {
                    console.log(rows);
                    connection.release();
                    if (err) {
                      res.status(status_codes.internal_server_error);
                      res.json({ message: constants.error_messages.db_query, err: err});
                    } else {
                      rows.forEach(function(row){
                        delete row.id;
                        delete row.quiz_id;
                      });
                      res.status(status_codes.ok);
                      res.json({ data: rows });
                    }
                  });
                }
              }
            });
        }
      });
    }
});

module.exports = router;
