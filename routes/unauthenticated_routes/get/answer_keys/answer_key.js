let router = require('express').Router();
let connection = require('../../../../utils/database_utils/database_connection');
let sql_statements = require('../../../../utils/database_utils/sql_statements');
let status_codes = require('../../../../utils/request_utils/status_codes');
let constants = require('../../../../utils/constants');

router.get('/books/:book_id/quizzes/:quiz_id/answer_key', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      res.status(status_codes.internal_server_error);
      res.json({ message: constants.error_messages.db_connect, err: err});
    } else {
      //1. GET ALL THE QUESTIONS FOR A QUIZ
      connection.query(sql_statements.get_questions, [req.params.quiz_id], function (err, rows) {
        if (err) {
          res.status(status_codes.internal_server_error);
          res.json({ message: constants.error_messages.db_query, err: err});
        } else {
          var numQuestions = rows.length;
          var correctAnswers = [];
          for(row in rows) {
            //2. GET CORRRECT ANSWERS FOR EACH QUESTION
            connection.query(sql_statements.get_answer_ids, [rows[row].id], function (err, rows) {
              if (err) {
                res.status(status_codes.internal_server_error);
                res.json({ message: constants.error_messages.db_query, err: err});
              } else {
                rows = rows.filter(function(row){
                  return row.correct
                })

                correctAnswers.push(rows[0]);

                if(correctAnswers.length === numQuestions) {
                  connection.release();
                  res.status(status_codes.ok);
                  res.json({data: correctAnswers});
                }
              }
            });
          }
        }
      });
    }
  });
});

module.exports = router;
