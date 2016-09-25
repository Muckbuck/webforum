var mongoose = require('mongoose');
var commentModel = require('../models/comment');
var isLoggedIn = require('../config/validation').isLoggedIn
module.exports =  function(app){

    app.post('/comment/:id', function(req, res){
    var authUser = req.user; 
    var id = req.params.id;
    var newModel = new commentModel();
    newModel.commentBody = req.body.commentBody;
    newModel.userID = authUser._id;
    newModel.thread = id;

    newModel.save(function(err){
        if(err)
            throw err;
        res.redirect('/')
       
    });

});


}

