const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingsSchema = new Schema({

    userid : {type: Schema.Types.ObjectId, ref: 'User'},
    venueid :  {type: Schema.Types.ObjectId, ref: 'Venue'},
    
    rating : {
        type :Number
    }
    
});

const Rating = mongoose.model('rating', RatingsSchema);

module.exports = Rating;