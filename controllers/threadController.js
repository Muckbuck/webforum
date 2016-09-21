var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var userModel = require('../models/userModel');
var threadModel = require('../models/threadModel');


module.exports = function(app){

    function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signup');
    }
    app.get('/newthread', isLoggedIn, function(req,res){
        res.render('newthread');
    });
    
    app.post('/savethread', isLoggedIn, function(req, res){
        var authUser = req.user;
        userModel.findOne({'username': authUser.username}, function(err, user){
            if(err)
                return err;
            if(!user)
                res.redirect('/')
            newThread = new threadModel();
            newThread.title = req.body.title;
            newThread.threadStart = req.body.threadstart;
            newThread.username = authUser.username;
            newThread.userId = authUser._id;
         

            newThread.save(function(err){
                        if(err)
                            throw err;
                        res.redirect('/');
                    });
        });
        
    });
    
}