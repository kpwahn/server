let bcrypt_util = require('../encryption_utils/bcrypt_util');
let constants = require('../constants');
let jwt = require('jsonwebtoken');

exports.authenticate = function(req, callback) {
    bcrypt_util.compare(req.body.password, req.body.email, function(err, res){
        if (err) {
            callback(err, false);
        } else if (res) {
            let token = jwt.sign({email: req.body.email}, constants.secret, {
                expiresIn : constants.jwt_expires_in
            });
            callback(null, {message: constants.success_messages.authenticated, token: token});
        } else {
            callback({"message": constants.error_messages.invalid_email_or_password}, false);
        }
    })
};

