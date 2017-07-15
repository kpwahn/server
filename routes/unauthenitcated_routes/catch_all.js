let constants = require('../../utils/constants');

module.exports = function (req, res) {
    res.json({ message: constants.error_messages.no_route_found });
};