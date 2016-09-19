var express = require('express');
var app = express()


var mongoose = require('mongoose');
var dbConf = require('./config/dbConf');


//sets up a connection to the database
mongoose.connect(dbConf.dev.URL);


// controllers
var indexController = require('./controllers/indexController');
var userController = require('./controllers/userController');
var apiController = require('./controllers/apiController');
var threadController = require('./controllers/threadController');

// either set from enviroment variable or if null, then 3000
var port = dbConf.deploy.PORT || dbConf.dev.PORT;

// express listening to earlier declared port
app.listen(port);

// maps the /assets/-path to the public folder to serve the client with static files
app.use('/assets/', express.static(__dirname + '/public'));

// sets the view engine
app.set('view engine', 'ejs')

// invoking the controllers
indexController(app);
userController(app);
apiController(app);


