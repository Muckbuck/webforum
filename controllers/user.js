var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var userModel = require('../models/user');
var passport = require('passport');
var flash = require('connect-flash');
var isLoggedIn = require('../config/validation').isLoggedIn
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
        successRedirect : '/',
        failureRedirect : '/signup', 
        
    }));
    app.get('/login', function(req, res, next){
        res.render('login.ejs');
        
    });
    //route logic for login in a user
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', 
        failureRedirect : '/', 
         
    }));
    app.get('/profile', isLoggedIn, function(req, res) {
        
        var user = req.user;
        var username = user.username;

        res.render('profile', {user : 'username'});
    });

    //call req.logout to end session and redirect to root
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}


