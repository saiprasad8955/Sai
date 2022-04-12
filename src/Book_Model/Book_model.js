const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    bookName : String,
    authorName: {
        type : String,
        required : true,
        },
   category : String,
    year : Number
},{timestamp :true });



module.exports = mongoose.model("Book",bookSchema);