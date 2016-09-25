var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var isLoggedIn = require('../config/validation').isLoggedIn
var userModel = require('../models/user');
var threadModel = require('../models/thread');
var commentModel = require('../models/comment');


module.exports = function(app){

    app.get('/newthread', isLoggedIn, function(req,res){
        res.render('newthread');
    });

    app.get('/thread/:id', function(req, res){
        var wildcard = req.params.id;
        threadModel.findOne({'_id': wildcard}, function(err, thread){
            if(err)
                return err;
            if(!thread)
                return  err;
            var stringifiedThread = JSON.stringify(thread);
            var parsedThread = JSON.parse(stringifiedThread);

            commentModel
            .find({ thread: wildcard })
            .exec(function (err, comments) {
            if (err) return handleError(err);
            console.log('The stories are an array: ', comments);
            res.render('displayThread', {parsedThread: parsedThread, comments: comments});
            
            })
          
            
           
                            
            
            
        });
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
            console.log(authUser._id)
         

            newThread.save(function(err){
                        if(err)
                            throw err;
                        res.redirect('/');
                    });
        });
        
    });
    
}