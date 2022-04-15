const mongoose = require("mongoose")

const newSchema = new mongoose.Schema({
    author_id : Number,
    author_name : String,
    age : Number,
    address : String
},{timestamp:true})

module.exports = mongoose.model("Author",newSchema)