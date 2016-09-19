var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var userModel = require('../models/userModel');

module.exports = function(app, Schema){
    app.get('/signup', function(req, res, next){
        res.render('signup');
    });
    //route logic for posting a user to the db
    app.post('/signup', urlencodedParser, function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var mail = req.body.mail;
        var newUser = new userModel({username: username, password: password, mail: mail});
        //checking if the input meets the requirements and if so then save them to db(Temp solution)
        if( username.length < 4 ||
            password.length < 6 ||
            mail.length < 1){
            res.send('Fail!');
        }else{
            newUser.save(function(err){
            if (err) throw err;
                console.log('user saved');
                res.send('Done!');
            });

        };
        
    });
    //route logic for login in a user
    app.post('/login', urlencodedParser, function(req, res){
        var username = req.body.username;
        var password = req.body.password;
    });
    //route logic for login out a user
    app.post('/logout', urlencodedParser, function(req, res){
    
    });
}


