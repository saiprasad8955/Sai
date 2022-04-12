const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema( {
    bookName :{
                type : String,
                required : true 
              },
    authorName : String ,
    category : String ,
    year : String
    } , 
{ timestamps: true });

module.exports = mongoose.model('User', userBookSchema) //users



// String, Number
// Boolean, Object/json, array