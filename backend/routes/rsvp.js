const express = require('express');
const { createRSVP, test } = require('../controllers/rsvpController');
const router = express.Router();

router.post('/', createRSVP);
router.get('/test', test);

module.exports = router;
