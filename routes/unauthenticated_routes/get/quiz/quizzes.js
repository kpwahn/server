let router = require('express').Router();
let connection = require('../../../../utils/database_utils/database_connection');
let sql_statements = require('../../../../utils/database_utils/sql_statements');
let status_codes = require('../../../../utils/request_utils/status_codes');
let constants = require('../../../../utils/constants');

router.get('/books/:book_id/quizzes/', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      res.status(status_codes.internal_server_error);
      res.json({ message: constants.error_messages.db_connect, err: err});
    } else {
      connection.query(sql_statements.get_quizzes, [req.params.book_id], function (err, rows) {
        connection.release();
        if (err) {
          res.status(status_codes.internal_server_error);
          res.json({ message: constants.error_messages.db_query, err: err});
        } else {
          res.status(status_codes.ok);
          res.json({data: rows});
        }
      });
    }
  });
});

module.exports = router;
