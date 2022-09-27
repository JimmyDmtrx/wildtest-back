const mongoose = require('mongoose');

const Argonaute = mongoose.model('Argonaute', { name: String });

module.exports = Argonaute;
