var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var commentSchema = new Schema({
    commentBody: String,
    userID: String,
    username: String,
    thread : [{ type: String, ref: 'Thread' }],
    reply : [{ type: String, ref: 'Reply' }]

    
});
module.exports = mongoose.model('Comment', commentSchema);

    
    
