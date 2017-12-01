let router = require('express').Router();
let connection = require('../../../../utils/database_utils/database_connection');
let sql_statements = require('../../../../utils/database_utils/sql_statements');
let status_codes = require('../../../../utils/request_utils/status_codes');
let constants = require('../../../../utils/constants');

router.get('/books/:book_id/quizzes/:quiz_id/questions/:question_id/answers', function (req, res) {
  connection.getConnection(function (err, connection) {
    connection.release();
    if (err) {
        res.status(status_codes.internal_server_error);
        res.json({ message: constants.error_messages.db_connect, err: err});
    } else {
      connection.query(sql_statements.get_answer_ids, [req.params.question_id], function (err, rows) {
        if (err) {
          res.status(status_codes.internal_server_error);
          res.json({ message: constants.error_messages.db_query, err: err});
        } else {
          res.status(status_codes.ok);

          if(req.query.correct){
            rows = rows.filter(function(row){
              return row.correct
            })
          } else {
            rows.forEach(function(row){
              delete row.correct;
            })
          }
          res.send({data: rows});
        }
      });
    }
  });
});

module.exports = router;
