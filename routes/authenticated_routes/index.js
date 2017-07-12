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
                return res.json({ err: err, message: 'Failed to authenticate token.' });
            } else {
                // If everything is good, save to request for use in other routes
                //req.decoded = decoded;
                next();
            }
        });
    } else {
         res.status(403);
         res.send({
            message: 'No token provided.'
        });
    }
});

// Routes
router.get('/some-other-route', require('./some-other-route.js'));

router.get('/', function(req, res){
    res.send({message: "Authentication successful, but no route found"})
})

module.exports = router;