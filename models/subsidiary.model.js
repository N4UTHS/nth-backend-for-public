const mongoose = require('mongoose');

const subsidiarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    explain: {
        type: String,
        required: true
    }
});

const Subsidiary = mongoose.model('Subsidiary', subsidiarySchema);

module.exports = Subsidiary;