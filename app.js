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

require('./config/passport')(passport, app, session); // requiring the settings file for passport auth
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


app.set('view engine', 'ejs')// sets the view engine

// middlewear required for passport
app.use(session(
    {secret: settings.dev.SECRET,
     resave: true,
     saveUninitialized: true,
     cookie: { maxAge : 900000 } }));// ms to expire  
app.use(passport.initialize()); 
app.use(passport.session());//keeps the session running for as long as the maxAge is set for

//controllers
require('./controllers/api.js')(app);
require('./controllers/index.js')(app);
require('./controllers/user.js')(app, passport); 
require('./controllers/comment.js')(app, passport); 
require('./controllers/thread.js')(app, passport); 



app.use('/assets/', express.static(__dirname + '/public'));// maps the /assets/-path to the public folder to serve the client with static files


var port = settings.deploy.PORT || settings.dev.PORT;// either set from enviroment variable or if null, then 3000


app.listen(port);//express listening on earlier declared port