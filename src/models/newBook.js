const mongoose = require("mongoose")
const authorId = mongoose.Schema.Types.ObjectId

const newBookSchema = new mongoose.Schema(
    {
        name : String ,
		author : {
            type : authorId,
            ref : "newAuthor"
        } ,
	    price : Number ,
        ratings: Number,
		publisher: {
            type : authorId,
            ref : "newPublisher"
        }
	},
    { timestamps: true } )

module.exports = mongoose.model( 'newBook', newBookSchema )