const mongoose = require("mongoose")

const newSchema = new mongoose.Schema({
    name : String,
    author_id :Number,
    price :Number,
    ratings :Number
},{ timestamp : true})


module.exports = mongoose.model("Book1",newSchema)