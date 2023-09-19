const express = require('express');
const router = express.Router();
const path = require('path');
const downloadController = require('../../controllers/video.controller'); // Replace with the correct path

// Serve files from the 'downloads' folder
router.use('/downloads', express.static(path.join(__dirname, '../../../downloads')));

// Define a route for downloading YouTube videos
router.post('/download', downloadController.downloadVideo);

module.exports = router;
