var mongoose = require('mongoose');
var objectId = '',pass;
var Schema = mongoose.Schema;
//schema and model for threads created by users
var threadSchema = new Schema({
    title: String,
    threadStart: String,
    votes: {upvotes: String, downvotes: String}
});
var Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;
    
    
