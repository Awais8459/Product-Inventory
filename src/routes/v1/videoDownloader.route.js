const express = require('express');
const cors = require('cors');

const { downloadVideo } = require('../../controllers/video.controller');
const router = express.Router();
router.use(cors());

router.get('/download', downloadVideo);

module.exports = router;
