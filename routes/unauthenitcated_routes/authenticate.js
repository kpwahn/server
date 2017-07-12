let router = require('express').Router();
let auth_util = require('../../utils/authentication_utils/autenticate_util');
let post_request_util = require('../../utils/request_utils/post_request_util');
let status_codes = require('../../utils/request_utils/status_codes');
let messages = require('../../utils/constants');
let bodyParser = require('body-parser');


router.post('/', bodyParser.json(), function(req, res) {
    let request_check = post_request_util.checkReqBody(req, ['email', 'password']);

    if( !request_check.has_correct_keys ){
        res.status(status_codes.bad_request);
        res.json({missing_keys: request_check.missing_keys});
    } else {
        auth_util.authenticate(req, function (err, isAuthenticated) {
            if (err) {
                res.json(err);
            } else if (isAuthenticated) {
                res.json(isAuthenticated);
            } else {
                res.json({message: messages.error_messages.invalid_email_or_password});
            }
        });
    }
});

module.exports = router;