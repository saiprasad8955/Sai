const mongoose = require("mongoose")

const newPublisherSchema = new mongoose.Schema(
    {
        authorName: String,
        age: Number,
        address: String,
        rating: Number
    },
    { timestamps: true })

module.exports = mongoose.model('NewPublisherpop', newPublisherSchema)