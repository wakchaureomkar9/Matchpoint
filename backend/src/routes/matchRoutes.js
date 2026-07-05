const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { matchResume } = require('../controllers/matchController');

router.post('/match', upload.single('resume'), matchResume);

module.exports = router;