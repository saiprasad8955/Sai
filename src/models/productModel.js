const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name:String,
	category:String,
    //mandatory property
	price:{
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users