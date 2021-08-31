const mongoose = require('mongoose');
const config = require('../config/db.config');

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    }

}, {timestamps: true});


module.exports = mongoose.model('Product', ProductSchema);
