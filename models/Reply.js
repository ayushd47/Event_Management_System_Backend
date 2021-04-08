const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({

    userid : {type: Schema.Types.ObjectId, ref: 'user'},
    commentid :  {type: Schema.Types.ObjectId, ref: 'comment'},
    venueid :  {type: Schema.Types.ObjectId, ref: 'venue'},
    reply : {

        type :String
    }
    
});

const Reply = mongoose.model('reply', ReplySchema);

module.exports = Reply;