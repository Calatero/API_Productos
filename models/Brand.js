const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    brandName: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('brand', BrandSchema);