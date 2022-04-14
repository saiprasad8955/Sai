const mongoose = require("mongoose")
const authorId = mongoose.Schema.Types.ObjectId

const newBookSchema = new mongoose.Schema(
    {
        name : String ,
		author : {
            type : authorId,
            ref : "Authorpop"
        } ,
	    price : Number ,
        ratings: Number,
		publisher: {
            type : authorId,
            ref : "NewPublisherpop"
        }
	},
    { timestamps: true } )

module.exports = mongoose.model( 'NewBookPop', newBookSchema )