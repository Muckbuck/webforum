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
        
    }));
    app.get('/login', function(req, res, next){
        res.render('login.ejs');
        
    });
    //route logic for login in a user
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login', 
         
    }));
    app.get('/profile', isLoggedIn, function(req, res) {
        
        var user = req.user;
        var username = user.username;

        res.render('profile', {user : 'username'});
    });
    //checking if the user is logged in with a session
    function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
    }
    //call req.logout to end session and redirect to root
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}


