var express = require('express');
var app = express()
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var settings = require('./config/settings');


//sets up a connection to the database
mongoose.connect(settings.dev.URL);

require('./config/passport')(passport, app, session); // pass passport for configuration
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// sets the view engine
app.set('view engine', 'ejs')

// middlewear required for passport
app.use(session(
    {secret: settings.dev.SECRET,
     resave: true, saveUninitialized: true,
     cookie: { maxAge : 900000 } })); 
app.use(passport.initialize()); 
app.use(passport.session()); // persistent login sessions



// // controllers
require('./controllers/apiController.js')(app);
require('./controllers/indexController.js')(app);
require('./controllers/userController.js')(app, passport); 
require('./controllers/threadController.js')(app, passport); 

// maps the /assets/-path to the public folder to serve the client with static files
app.use('/assets/', express.static(__dirname + '/public'));

// either set from enviroment variable or if null, then 3000
var port = settings.deploy.PORT || settings.dev.PORT;

// express listening to earlier declared port
app.listen(port);