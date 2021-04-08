const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstname : {
        type : String,
        required: [true, "Name field is required"]
    },
    lastname : {
        type : String,
        required: [true, "Name field is required"]
    },
    location: {
        type: String,
       
    },
    phonenumber: {
        type : String,
        required: [true, "Name field is required"]
    },
    email : {
        type : String,
        required: [true, "Name field is required"]
    },
    
    password: {
        type : String,
        required : [true, "Name field is required"]
    },


    profileImg : {
        type : String,
        default : "man.png",
    },
    
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
