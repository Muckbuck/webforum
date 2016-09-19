var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    userID: String,
    mail: String,

    
});
var Post = mongoose.model('Post', PostSchema);
module.exports = Post;
    
    
