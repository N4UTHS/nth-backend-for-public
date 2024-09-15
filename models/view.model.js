const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
    announcementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Announcement',
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    viewedAt: {
        type: Date,
        required: true
    }
});

viewSchema.index({ announcementId: 1, ip: 1, viewedAt: 1 }, { unique: true });

const View = mongoose.model('Views', viewSchema);

module.exports = View;