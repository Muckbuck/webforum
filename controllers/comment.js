var mongoose = require('mongoose');
var commentModel = require('../models/comment');
var isLoggedIn = require('../config/validation').isLoggedIn
module.exports =  function(app){

    app.post('/comment', isLoggedIn, function(req, res){
        var authUser = req.user; 
        var id = req.query.commentId;
        var newModel = new commentModel();
        newModel.commentBody = req.body.commentBody;
        newModel.userID = authUser._id;
        newModel.username = authUser.username;
        newModel.thread = id;

        newModel.save(function(err){
            if(err)
                throw err;
            res.redirect('back');
        
        });

    });
    


}

