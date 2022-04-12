const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema( {
    bookName: {
        type : String ,
        required : true
},  prices: {
    indianPrice: String,
    europeanPrice: String,
},  
    year : {
        type : Number,
        default : 2021
    },
    tags : [String],
    authorName: String,
    totalpages : Number,
    stockAvailable : Boolean
}, { timestamps: true });


module.exports = mongoose.model('BookData', BookSchema)
