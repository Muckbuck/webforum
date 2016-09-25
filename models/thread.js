var mongoose = require('mongoose');
var objectId = '',pass;
var Schema = mongoose.Schema;
//schema and model for threads created by users
var threadSchema = new Schema({
    title: String,
    threadStart: String,
    username: String,
    userId: String,
    comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    
});
module.exports = mongoose.model('Thread', threadSchema);

    
    
