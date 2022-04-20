const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    isFreeAppUser: true,
    date: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users