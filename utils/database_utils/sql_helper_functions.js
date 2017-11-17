let connection = require('../../utils/database_utils/database_connection');

module.exports = {
    escape: function(sql){
         let escapedStatement = connection.escapeId(sql);
         return escapedStatement;
    }
}
