const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InvitationSchema = new Schema({

        weddingid :  {type: Schema.Types.ObjectId, ref: 'wedding'},
        name : {
            type : String,
        },
        email : {
            type : String
        }
})

const Invitation = mongoose.model('invitation', InvitationSchema);
module.exports = Invitation;