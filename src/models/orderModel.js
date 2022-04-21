const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const userSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "UserOne"
    },
    productId: {
        type: ObjectId,
        ref: "Product"
    },
    amount: Number,
    isFreeAppUser: Boolean,
    date:{
        type: Date,
        default: new Date().toUTCString()
            }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) 