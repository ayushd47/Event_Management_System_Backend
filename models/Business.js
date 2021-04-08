const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
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

const LinksSchema = new Schema({
    facebook : {
        type : String,
    },
    instagram : {type : String},
    website : {type : String}
})

const BusinessSchema = new Schema({

    vendorid :  {type: Schema.Types.ObjectId, ref: 'vendor'},
    
    businessname : {
        type : String,
    },

    businesstype : {
        type : String,
    },

    businessdesc : {
        type  : String,
    },
    businesslocation : LocationSchema,

    businesscontact : {
        type : String,
    },

    availableDates : {
        type : [String]
    },

    businesspricing : {
        type : String
    },

    businessLink :LinksSchema, 

    businessImage : {
        type : String,
        default : ""
    },

    album :  {
        type : [String]
    },

})

const Business = mongoose.model('business', BusinessSchema);
module.exports = Business;