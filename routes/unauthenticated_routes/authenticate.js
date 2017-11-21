let router = require('express').Router();
let auth_util = require('../../utils/authentication_utils/autenticate_util');
let post_request_util = require('../../utils/request_utils/post_request_util');
let status_codes = require('../../utils/request_utils/status_codes');
let constants = require('../../utils/constants');
let bodyParser = require('body-parser');


router.post('/authenticate', bodyParser.json(), function(req, res) {
    let request_check = post_request_util.checkReqBody(req, ['email', 'password']);

    if( !request_check.has_correct_keys ){
        res.status(status_codes.bad_request);
        res.json({missing_keys: request_check.missing_keys});
    } else {
        auth_util.authenticate(req, function (err, isAuthenticated) {
            if (err) {
                res.status(status_codes.internal_server_error);
                res.json(err);
            } else if (isAuthenticated) {
                res.status(status_codes.ok);
                res.json(isAuthenticated);
            } else {
                res.status(status_codes.forbidden);
                res.json({message: constants.error_messages.invalid_email_or_password});
            }
        });
    }
});

router.get('/authenticate', function(req, res) {
  res.status(status_codes.method_not_allowed);
  res.set('Allow', ['POST']);
  res.json({ message: constants.method_not_allowed});
});

router.put('/authenticate', function(req, res) {
  res.status(status_codes.method_not_allowed);
  res.set('Allow', ['POST']);
  res.json({ message: constants.method_not_allowed});
});

router.patch('/authenticate', function(req, res) {
  res.status(status_codes.method_not_allowed);
  res.set('Allow', ['POST']);
  res.json({ message: constants.method_not_allowed});
});

router.delete('/authenticate', function(req, res) {
  res.status(status_codes.method_not_allowed);
  res.set('Allow', ['POST']);
  res.json({ message: constants.method_not_allowed});
});

module.exports = router;
