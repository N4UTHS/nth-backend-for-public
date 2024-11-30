const mongoose = require('mongoose');

const subsidiarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    }
});

const Subsidiary = mongoose.model('Subsidiary', subsidiarySchema);

module.exports = Subsidiary;
