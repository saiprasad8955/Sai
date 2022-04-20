const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: String,
    // Default balance at user registration is 100
	balance:{
        type : Number,
        default : 100
    }, 
	address: String,
	age: Number,
    // Allowed values are - “male”, “female”, “other”
 	gender: {
         type : String,
         enum: ["male","female","other"]
     } ,
	isFreeAppUser : Boolean

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users
