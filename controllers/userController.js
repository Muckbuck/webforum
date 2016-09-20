var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var userModel = require('../models/userModel');
var passport = require('passport');
var flash = require('connect-flash');

var bcrypt = require('bcrypt');
const saltRounds = 10;



module.exports = function(app, Schema){

    app.get('/sessiontest', isLoggedIn, function(req, res, next){
        
        res.send(req.user);
    });
    app.get('/signup', function(req, res, next){
        res.render('signup.ejs');
    });
    //route logic for posting a user to the db
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup', 
        failureFlash : true
    }));
    app.get('/login', function(req, res, next){
        res.render('login.ejs');
        
    });
    //route logic for login in a user
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));
    app.get('/profile', isLoggedIn, function(req, res) {
        
        var user = req.user;
        var username = user.username;

        // pass the username currently logged in user
        res.render('profile', {user : 'username'});
    });

    function isLoggedIn(req, res, next) {

   
    if (req.isAuthenticated())
        return next();

   
    res.send('You are not logged in');
    }

    //call req.logout to end session and redirect to root
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}


