const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    Category: {
        type: String,
        required: true

    },

    code: {
        type: String,
        unique: true,
        required: true
    },

    name: {
        type: String,
        required: true

    },

    image: {
        type: String,
        required: true

    },

    price: {
        tpye: Number
    },

    minQuantity: {
        type: Number
    },

    discountRate: {
        type: Number
    }

});

module.exports.Product = mongoose.model('Product', ProductSchema);
