let constants = require('./utils/constants');
let express = require('express');

let port = process.env.PORT || constants.port;

let app = express();

// app.options('/*', function(req, res, next){
//   res.sendStatus(200);
// });

/* UNAUTHENTICATED ROUTES */
// app.use('/api/create-new-user', require('./routes/unauthenticated_routes/create_new_user'));
app.use('/api', require('./routes/unauthenticated_routes/index.js'));

/* AUTHENTICATED ROUTES */
app.use('/api', require('./routes/authenticated_routes/index.js'));

app.listen(port, function() {
    console.log('api running on port ' + port);
});
