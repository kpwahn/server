let connection = require('../../utils/database_utils/database_connection');
let sql_statements = require('../../utils/database_utils/sql_statements');
let status_codes = require('../../utils/request_utils/status_codes');
let constants = require('../../utils/constants');

module.exports = function (req, res) {
  connection.getConnection(function (err, connection) {
      if (err) {
          res.status(status_codes.internal_server_error);
          res.json({ message: constants.error_messages.db_connect, err: err});
      } else {
        connection.query(sql_statements.get_quizes, [req.body.email], function (err, rows) {
            if (err) {
                res.status(status_codes.internal_server_error);
                res.json({ message: constants.error_messages.db_query, err: err});
            } else {
              // Remove the id from the response
              rows.forEach(function(row){
                delete row.id;
              })

              res.status(status_codes.ok);
              res.json({data: rows});
            }
      });
    }
  });
}
