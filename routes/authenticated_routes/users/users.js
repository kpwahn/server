let router = require('express').Router();
let bodyParser = require('body-parser');

router.post('/create-new-user', bodyParser.json(), require('./../unauthenitcated_routes/create_new_user.js'));

router.get('/', function(req, res) {
    res.send("user stuff");
})

module.exports = router;