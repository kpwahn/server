var sql = require('../../utils/database_utils/sql_helper_functions');

module.exports = {
    checkReqBody: function(req, expected_params){
        let response = {
            has_correct_params: true,
            missing_params: []
        };

        expected_params.forEach(function(key, index){
            if(req.query[key] === undefined) {
                response.has_correct_params = false;
                response.missing_params.push(expected_params[index]);
            }
        });

        return response;
    },
    escapeQueryParams: function(params){
        let escaped_params = {};

        Object.keys(params).forEach(function(key){
             escaped_params[key] = sql.escape(params[key]);
        });

        return escaped_params;
    }
}
