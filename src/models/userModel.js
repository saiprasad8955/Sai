const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: String,
    lastName: String,
    mobile: Number,
    emailId: String,
    password: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    isDeleted : {
        type :Boolean,
        default : false
    },
    age: Number,
    post:{
        type:[String],
        default:[]
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
