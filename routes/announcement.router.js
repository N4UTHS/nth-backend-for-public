const express = require('express');
const router = express.Router();

const announcementController = require('../controllers/announcement.controller');

router.get('/', announcementController.everyAnnouncements);
router.get('/:id', announcementController.singleAnnouncement);

module.exports = router;