const express = require('express');
const cors = require('cors');

const { checkDownload, downloadVideo } = require('../../controllers/video.controller');
const router = express.Router();
router.use(cors());

router.get('/check-download', checkDownload);
router.get('/download', downloadVideo);

module.exports = router;
