const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    // Write the schema content
    name: String,
	category: String,
	price: {
        type: Number,
        required: true
    } //70 mandatory property
   
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema) //products
