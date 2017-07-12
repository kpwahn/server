let https = require('https');
let constants = require('./utils/constants');
let express = require('express');

let port = process.env.PORT || constants.port;

let app = express();

/* UNAUTHENTICATED ROUTES */
app.use('/api/create-new-user', require('./routes/unauthenitcated_routes/create_new_user'));
app.use('/api/authenticate', require('./routes/unauthenitcated_routes/authenticate.js'));

/* AUTHENTICATED ROUTES */
app.use('/api', require('./routes/authenticated_routes/index.js'));

app.use('*', require('./routes/unauthenitcated_routes/catch_all.js'));

app.listen(port, function() {
    console.log('api running on port ' + port);
});