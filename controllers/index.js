var mongoose = require('mongoose');
var threadModel = require('../models/thread');



module.exports = function(app){
    //routing for the root path
    app.get('/', function(req, res){
        var isAuth = req.isAuthenticated()
        threadModel.find({}, function(err, threads){
            if(err)
                throw err;
            var stringifiedThreads = JSON.stringify(threads);
            var parsedThreads = JSON.parse(stringifiedThreads);
            
            for(i=0; i<parsedThreads.length; i++){
                console.log(parsedThreads[i].title);
            }
            res.render('index', {parsedThreads: parsedThreads, isAuth: isAuth});
        })
        
    });
    //middlewear to log the requested URL
    app.use('/', function(req, res, next){
        console.log('Requested url: ' + req.url)
        next()
    });
};