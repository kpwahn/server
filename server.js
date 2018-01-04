let constants = require('./utils/constants');
let express = require('express');

let port = process.env.PORT || constants.port;

let app = express();

app.options('/*', function(req, res, next){
  res.sendStatus(200);
});

/* UNAUTHENTICATED ROUTES */
app.use('/api', require('./routes/unauthenticated_routes/index.js'));

/* AUTHENTICATED ROUTES */
app.use('/api', require('./routes/authenticated_routes/index.js'));

app.use(express.static(__dirname));
app.get('/index', function(req, res) {
	res.sendFile('./index.html', { root: __dirname });
});

app.listen(port, function() {
    console.log('api running on port ' + port);
});
