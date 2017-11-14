let router = require('express').Router();
let bodyParser = require('body-parser');
let status_codes = require('../../utils/request_utils/status_codes');
let constants = require('../../utils/constants');
let jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function(req, res, next){
    if(req.headers['access-token']) {
        jwt.verify(req.headers['access-token'], constants.secret, function(err, decoded) {
            if (err) {
                res.status(status_codes.bad_request);
                return res.json({ err: err, message: constants.error_messages.token_auth_failed });
            } else {
                // If everything is good, save to request for use in other routes
                //req.decoded = decoded;
                next();
            }
        });
    } else {
         res.status(403);
         res.send({
            message: constants.error_messages.no_token
        });
    }
});

//router.get('/something-protected', require('./something-protected.js'));

module.exports = router;
