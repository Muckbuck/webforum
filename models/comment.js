var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var commentSchema = new Schema({
    commentBody: String,
    userID: String,
    username: String,
    thread : [{ type: String, ref: 'Thread' }],
    parentComment : [{ type: String, ref: 'Comment' }]

    
});
module.exports = mongoose.model('Comment', commentSchema);

    
    
