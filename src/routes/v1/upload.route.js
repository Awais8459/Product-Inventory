const router = require("express").Router();
const uploadController = require('../../controllers/upload.controller');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post("/upload/:parentId", upload.array('file', 10), uploadController.uploadFiles);
module.exports = router;
