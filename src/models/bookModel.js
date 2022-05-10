const mongoose = require("mongoose");
const userModel=require('./userModel')
const ObjectId=mongoose.SchemaType.ObjectId


const bookSchema=new mongoose.Schema({ 
    title: {type:String, required:true, unique:true},
    excerpt: {type:String, required:true}, 
    userId: {type:ObjectId, required:true,ref:'Users'},
    ISBN: {type:String, required:true, unique:true},
    category: {type:String, required:true},
    subcategory: [{type:String, required:true}],
    reviews: {type:Number, default: 0, /*comment: Holds number of reviews of this book*/},
    deletedAt: {type: String, /*when the document is deleted*/},
    isDeleted: {type:Boolean, default: false},
    releasedAt: {type: String, required:true}/*format("YYYY-MM-DD")}*/
},{timestamp:true})

module.exports =mongoose.model("Book",bookSchema)