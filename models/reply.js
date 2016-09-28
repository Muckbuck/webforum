var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
    userId: String,
    replyBody: String,
    parent : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

});

module.exports = mongoose.model('Reply', replySchema);
