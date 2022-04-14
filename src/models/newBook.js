const mongoose = require("mongoose")

const newBookSchema = new mongoose.Schema(
    {
        name : String ,
		author : String ,
	    price : Number ,
		ratings : Number,
		publisher: String
    },
    { timestamps: true } )

module.exports = mongoose.model( 'NewBookPop', newBookSchema )