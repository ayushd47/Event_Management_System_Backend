const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const WeddingSchema = new Schema({

    userid : {type: Schema.Types.ObjectId, ref: 'user'},

    brideName : {
        type : String,
    },
    groomName : {
        type : String,
    },
    weddingDate : {
        type : String,
    },

    

      weddingVenue : {
             type: Schema.Types.ObjectId,
             ref: 'venue',
     
        },
        weddingPhotography : {
            type: Schema.Types.ObjectId,
            ref : 'business',
           
        },
        weddingBakery : {
            type: Schema.Types.ObjectId,
            ref : 'business',
           
        },
        weddingMakeup : {
            type: Schema.Types.ObjectId,
            ref : 'business',
           
        },
    

    album : {
        type : [String]
    }, 
});

const Wedding = mongoose.model('wedding', WeddingSchema);
module.exports = Wedding;

