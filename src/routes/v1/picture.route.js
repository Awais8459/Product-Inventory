// const pictureController = require('../../controllers/picture.controller');
// const express = require('express');
// const router = express.Router();


// // Route for uploading a picture
// router.post("/", pictureController.uploadPicture);

// module.exports = router;

const express = require('express');
const router = express.Router();
const path = require("path");
const { uploadFile } = require('../../controllers/picture.controller');
const { upload, errorHandler } = require('../../services/picture.service')

router.use('/profile', express.static('upload/images'));
router.post("/upload", upload.single('profile'), uploadFile);

router.use(errorHandler);

module.exports = router;