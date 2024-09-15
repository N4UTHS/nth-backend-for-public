const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true
    }
});

const Verification = mongoose.model('Verifications', codeSchema);

module.exports = Verification;