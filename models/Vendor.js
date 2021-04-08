const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    fullname : {
        type : String,
        required: [true, "Name field is required"]
    },
    email : {
        type : String,
        required : [true, "Email field is required"]
    },
    location : {
        type : String,
        required : [true, "Location field is required"]
    },
    contact : {
        type : Number,
        required : [true, "Contact field is required"]
    },
    businessType : {
        type : String,
    },
    password : {
        type : String,
        required : [true, "Password field is required"]
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]


})

const Vendor = mongoose.model('vendor', VendorSchema);
module.exports = Vendor;