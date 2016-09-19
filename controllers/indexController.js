module.exports = function(app){
    //routing for the root path
    app.get('/', function(req, res, next){
    
        res.render('index');
    });
    //random middlewear to log the requested URL
    app.use('/', function(req, res, next){
        console.log('Requested url: ' + req.url)
        next()
    });
};