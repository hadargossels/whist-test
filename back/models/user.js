const mongoose = require('mongoose');
const config = require('../config/db.config');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    lastText: {
        type: String,
        required: true
    }

}, {timestamps: true});


module.exports = mongoose.model('User', UserSchema);
