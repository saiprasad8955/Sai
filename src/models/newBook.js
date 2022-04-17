const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId


const newBookSchema = new mongoose.Schema(
    {
        name : String ,
		author : {
            type : objectId,
            ref : "newAuthor"
        } ,
	    price : Number ,
        ratings: Number,
		publisher: {
            type : objectId,
            ref : "newPublisher"
        },
        isHardCover:{
            type : Boolean,
            default : false
        }
	},
    { timestamps: true } )

module.exports = mongoose.model( 'newBook', newBookSchema )