var mongoose = require('mongoose');
var threadModel = require('../models/threadModel');


module.exports = function(app){
    //routing for the root path
    app.get('/', function(req, res){
        threadModel.find({}, function(err, threads){
            if(err)
                throw err;
            var stringifyiedThreads = JSON.stringify(threads);
            var parsedThreads = JSON.parse(stringifyiedThreads);
            
            for(i=0; i<parsedThreads.length; i++){
                console.log(parsedThreads[i].title);
            }
            res.render('index', {parsedThreads: parsedThreads});
        })
        
    });
    //middlewear to log the requested URL
    app.use('/', function(req, res, next){
        console.log('Requested url: ' + req.url)
        next()
    });
};