const router = require("express").Router();
const imageController = require('../../controllers/image.controller');
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Multer upload instance
const upload = multer({ storage });

// Define the route for uploading an image
router.post("/upload/:parentId", upload.single('image'), imageController.uploadImage);

module.exports = router;
