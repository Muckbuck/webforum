var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var commentSchema = new Schema({
    commentBody: String,
    userID: String,
    thread : [{ type: String, ref: 'Thread' }]

    
});
module.exports = mongoose.model('Comment', commentSchema);

    
    
