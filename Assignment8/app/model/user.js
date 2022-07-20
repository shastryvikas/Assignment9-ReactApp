const mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
    emailID: { type: String, unique: true },
    password: { type: String }
});