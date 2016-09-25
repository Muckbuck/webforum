var mongoose = require('mongoose');
var userModel = require('../models/user');

module.exports = function(app){
    app.get('/api/user', function(req, res){
        
            userModel.findOne(req.query,
             function (err, users) {
                if (err) return handleError(err);
                console.log(JSON.stringify(users));
                var userObj = JSON.stringify(users);
                var parsedUserObj = JSON.parse(userObj);
                console.log(parsedUserObj._id);
                res.send(parsedUserObj._id); 
             })
    });

    app.get('/api/post', function(req, res){
        
        res.send(querystring);

    });

    app.delete('/api:id', function(){

    });

    
};