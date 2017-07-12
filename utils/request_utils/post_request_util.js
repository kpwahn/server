var sql = require('../../utils/database_utils/sql_helper_functions');

module.exports = {
    checkReqBody: function(req, expected_keys){
        let response = {
            has_correct_keys: true,
            missing_keys: []
        };

        expected_keys.forEach(function(key, index){
            if(req.body[key] === undefined) {
                response.has_correct_keys = false;
                response.missing_keys.push(expected_keys[index]);
            }
        });

        return response;
    },
    escapeBody: function(body){
        let escaped_body = {};

        Object.keys(body).forEach(function(key){
             escaped_body[key] = sql.escape(body[key]);
        });

        return escaped_body;
    }
}