var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var isLoggedIn = require('../config/validation').isLoggedIn
var userModel = require('../models/user');
var threadModel = require('../models/thread');
var commentModel = require('../models/comment');
var replyModel = require('../models/reply');


module.exports = function(app){

    app.get('/newthread', isLoggedIn, function(req,res){
        res.render('newthread');
    });

    app.get('/thread', function(req, res){
        var query = req.query.threadId;
        var commentQuery = req.query.commentId;
        var isAuth = req.isAuthenticated();
        var replyObj = {};
        threadModel.findOne({'_id': query}, function(err, thread){
            if(err)
                return err;
            if(!thread)
                return  err;
            var stringifiedThread = JSON.stringify(thread);
            var parsedThread = JSON.parse(stringifiedThread);

            commentModel
            .find({ thread: query })
            .exec(function (err, comments) {
                if (err) return handleError(err);
               
                    replyModel
                    .find({ parent: commentQuery })
                    .exec(function (err, replies) {
                        if (err) return handleError(err);
                    
                    })

               
            
            res.render('displayThread', {parsedThread: parsedThread, comments: comments, isAuth: isAuth, replies: replyObj});
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