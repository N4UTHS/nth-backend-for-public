const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: false
    },
    writer: {
        type: String,
        default: "관리자"
    },
    title: {
        type: String,
        required: true
    },
    main_text: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: false
    },
    s3_key: {
        type: String,
        required: false
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    is_updated: {
        type: Boolean,
        default: false
    }
});

const Announcement = mongoose.model('Announcements', announcementSchema);

module.exports = Announcement;