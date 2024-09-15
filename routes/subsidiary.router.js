const express = require('express');
const router = express.Router();

const subsidiaryController = require('../controllers/subsidiary.controller');

router.get('/', subsidiaryController.subsidiaryList);

module.exports = router;