const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const BookingSchema = new Schema({

    weddingid :  {type: Schema.Types.ObjectId, ref: 'wedding'},
    venueid : {type: Schema.Types.ObjectId, ref: 'venue'},
    businessid : {type: Schema.Types.ObjectId, ref: 'business'},
    date : {
        type : String
    },
    type : {
        type : String
    }
    
})


const Booking = mongoose.model("booking", BookingSchema);
module.exports = Booking;