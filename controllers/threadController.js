var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var userModel = require('../models/userModel');
var threadModel = require('../models/threadModel');


module.exports = function(app){
    
    app.post('/savethread', function(req, res){
        
        userModel.findOne({'username': 'user'}, function(err, user){
            console.log('yo'); 
            var userObj = JSON.stringify(user);
            var parsedUserObj = JSON.parse(userObj);
            this.userId = parsedUserObj._id;
            console.log(userId); 
            newThread = new threadModel({
                title: title,
                threadstart: threadstart,
                created: date,
                userId: this.userId
            });
        });
        
    });
    
}