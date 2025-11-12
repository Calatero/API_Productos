const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    brandId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('product', ProductSchema);