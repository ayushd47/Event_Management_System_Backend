const mongoose = require('mongoose');
const Schema = mongoose.Schema;


 
const VenuePricing = new Schema({
    veg : {
        type : String,
    },
    nonVeg : {
        type : String,
    }
});

const VenueCapacity = new Schema({
    indoor : {
        type : Number,
    },
    outdoor : {
        type : Number,
    }
});

const VenueLocation = new Schema({
    name : {
        type :String
    },
    lat : {
        type : String
    },
    lng : {
        type : String
    }
});

const VenueSchema = new Schema({
    vendorid :   {type: Schema.Types.ObjectId, ref: 'vendor'},

    venueName :{
        type : String
    },
    venueType : {
        type : String,
    },
    venueDesc : {
        type : String
    },
    venueContact : {
        type : Number,
    },
    
    venueCapacity : VenueCapacity,

    venuePricing : VenuePricing,

    location: VenueLocation,

    availableDates : {
        type : [String]
    },

    image : {
        type : String,
        default : ""
    },
    album :  {
        type : [String]
    },


});
const Venue = mongoose.model('venue', VenueSchema);

module.exports = Venue;
