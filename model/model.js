const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    Link: {
        type: String,
        required: [true, "Link is required"],
        trim: true
    }
}, { timestamps: true });



module.exports = mongoose.model('AWS', UserProfileSchema)