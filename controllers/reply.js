var replyModel = require('../models/reply');
var isLoggedIn = require('../config/validation').isLoggedIn;
module.exports = function(app){
    app.post('/reply', isLoggedIn, function(req, res){
        var authUser = req.user;
        var query = req.query.parentId;
        replyModel = new replyModel();
        replyModel.userId = authUser._id;
        replyModel.replyBody = req.body.replyBody;
        replyModel.parent = query;

        replyModel.save(function(err){
            if(err)
                throw err;
            res.redirect('back');
        }); 
    });
}
