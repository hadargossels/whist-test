const mongoose = require('mongoose');
const config = require('../config/db.config');

const InvoiceSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    sale: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    } 


}, {timestamps: true});


module.exports = mongoose.model('Invoice', InvoiceSchema);
