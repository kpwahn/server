let router = require('express').Router();
let connection = require('../../utils/database_utils/database_connection');
let sql_statements = require('../../utils/database_utils/sql_statements');
let get_request_util = require('../../utils/request_utils/get_request_util');
let status_codes = require('../../utils/request_utils/status_codes');
let constants = require('../../utils/constants');

router.get('/', function (req, res) {

});

module.exports = router;
